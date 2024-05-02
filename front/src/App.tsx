import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
