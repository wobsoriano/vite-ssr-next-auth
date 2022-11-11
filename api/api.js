import NextAuth from 'next-auth'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth/next'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { fetch, Request } from 'node-fetch-native'
import GithubProvider from 'next-auth/providers/github'

global.fetch = fetch
global.Request = Request

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ]
}

function NextAuthHandler (req, res) {
  const nextauth = req.path.split('/')
  nextauth.splice(0, 3)
  req.query.nextauth = nextauth

  NextAuth(req, res, authOptions)
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

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

module.exports = app
