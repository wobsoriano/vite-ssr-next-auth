import { hydrateRoot } from 'react-dom/client'
import type { PageContextClient } from './types'
import { PageLayout } from "./layout";

export { render }

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  hydrateRoot(
    document.getElementById('page-view')!,
    <PageLayout>
      <Page {...pageProps} />
    </PageLayout>
  )
}
