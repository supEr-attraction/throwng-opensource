import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import RecoilizeDebugger from "recoilize";

function App() {
  return (
    <RecoilRoot>
      <RecoilizeDebugger />
      <Suspense fallback={<div></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
