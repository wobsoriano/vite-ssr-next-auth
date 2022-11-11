import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '@/server/handler'
import type { PageContextServer } from '@/renderer/types'

export { onBeforeRender }

async function onBeforeRender(pageContext: PageContextServer) {
  const { req, res } = pageContext
  const session = await unstable_getServerSession(req, res, authOptions)

  return {
    pageContext: {
      pageProps: {
        session
      }
    }
  }
}
