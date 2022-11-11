import path from 'path'
import type { Request, Response } from 'express';
import * as dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const options = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
    ],
};

const authHandler = (req: Request, res: Response) => NextAuth(req, res, options);

export { authHandler };
