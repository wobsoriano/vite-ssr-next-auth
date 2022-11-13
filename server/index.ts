/// <reference types="vite/client" />
import express from 'express'
import { renderPage } from 'vite-plugin-ssr'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth/next'
import httpDevServer from 'vavite/http-dev-server'
import { NextAuthHandler, authOptions } from './handler'

startServer()

function startServer () {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  if (import.meta.env.PROD) {
    app.use(express.static('dist/client'))
  }

  app.get('/api/auth/*', NextAuthHandler)
  app.post('/api/auth/*', NextAuthHandler)

  app.get('/api/examples/protected', async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session) {
      return res.send({
        content:
          'This is protected content. You can access this content because you are signed in.'
      })
    }

    res.send({
      error: 'You must be signed in to view the protected content on this page.'
    })
  })

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      req,
      res
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) { return next() }
    const body = await httpResponse.getBody()
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(body)
  })

  if (import.meta.env.PROD) {
    const port = process.env.PORT || 3000
    app.listen(port)
    console.log(`Server running at http://localhost:${port}`)
  } else {
		httpDevServer!.on('request', app)
  }
}
