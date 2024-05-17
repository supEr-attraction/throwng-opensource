import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@components/ErrorFallback";

function App() {
  const url = window.location.pathname;

  if (url === "/grafana-server") {
    return null;
  }

  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div></div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
