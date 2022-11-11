import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import type { Request, Response } from 'express'
import * as dotenv from 'dotenv'

import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, '../.env') })

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ]
}

export const authHandler = (req: Request, res: Response) => NextAuth(req, res, authOptions)