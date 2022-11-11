import type { PageContextClient } from './types'
import { PageLayout } from "./layout";
import ReactDOM from 'react-dom/client'
import { Session } from 'next-auth';

export const clientRouting = true
export const hydrationCanBeAborted = true

let root: ReactDOM.Root

export async function render(pageContext: PageContextClient & { session: Session }) {
  const { Page, pageProps, session } = pageContext
  const page = (
    <PageLayout session={session}>
      <Page {...pageProps} />
    </PageLayout>
  )
  const container = document.getElementById('page-view')!
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  }
}
