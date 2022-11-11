import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import type { PageContextClient } from './types'
import { PageLayout } from "./PageLayout";

export { render }

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  hydrateRoot(
    document.getElementById('page-view')!,
    <PageLayout pageContext={pageContext}>
      <Page {...pageProps} />
    </PageLayout>
  )
}
