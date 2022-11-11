import express from 'express'
import { renderPage } from 'vite-plugin-ssr'
import { fetch, Request } from 'node-fetch-native'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { authHandler as NextAuthHandler } from './auth/next';

global.fetch = fetch;
global.Request = Request;

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

startServer();

async function startServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  if (isProduction) {
    const sirv = require('sirv')
    app.use(sirv(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  app.get("/api/auth/*", (req, res) => {
    const nextauth = req.path.split("/");
    nextauth.splice(0, 3);
    req.query.nextauth = nextauth;

    NextAuthHandler(req, res)
  });

  app.post("/api/auth/*", (req, res) => {
    const nextauth = req.path.split("/");
    nextauth.splice(0, 3);
    req.query.nextauth = nextauth;

    NextAuthHandler(req, res)
  });

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const body = await httpResponse.getBody()
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(body)
  })


  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
