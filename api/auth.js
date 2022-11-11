import NextAuth from 'next-auth'
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

export default function handler (req, res) {
  const nextauth = req.url.split('/')
  console.log(nextauth)
  nextauth.splice(0, 3)
  console.log(nextauth)
  req.query.nextauth = nextauth
  console.log(req.query)

  NextAuth(req, res, authOptions)
}