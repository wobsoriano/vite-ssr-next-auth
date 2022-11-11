import React from 'react'
import { SessionProvider } from "next-auth/react"
import Header from "./header"
import Footer from "./footer"

export { PageLayout };

function PageLayout({ children }: { children: React.ReactNode; }) {
  return (
    <React.StrictMode>
      <SessionProvider session={{}}>
       <Header />
        <main>{children}</main>
        <Footer />
      </SessionProvider>
    </React.StrictMode>
  )
}
