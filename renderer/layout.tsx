import React from 'react'
import { SessionProvider } from "next-auth/react"
import Header from "./header"
import Footer from "./footer"
import './layout.css'
import { Session } from 'next-auth'

export { PageLayout };

function PageLayout({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <React.StrictMode>
      <SessionProvider session={session}>
       <Header />
        <main>{children}</main>
        <Footer />
      </SessionProvider>
    </React.StrictMode>
  )
}
