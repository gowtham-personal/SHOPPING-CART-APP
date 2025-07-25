import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import SomethingWentWrong from '@/components/bricks/SomethingWentWrong'
import ErrorBoundary from '@/components/bricks/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={SomethingWentWrong}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
