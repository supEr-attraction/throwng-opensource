import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";
// import * as Sentry from "@sentry/react";

function App() {
  const url = window.location.pathname;

  if (url === "/grafana-server") {
    return null;
  }

  return (
    <RecoilRoot>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}

// export default Sentry.withProfiler(App);
export default App;
