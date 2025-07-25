import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App.tsx";
import ErrorBoundary from "@/components/bricks/ErrorBoundary";
import SomethingWentWrong from "@/components/bricks/SomethingWentWrong";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={SomethingWentWrong}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
