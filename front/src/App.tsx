import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import RecoilizeDebugger from "recoilize";
// import { requestPermission } from "./notificaiton/firebase-messaging-sw";

function App() {
  // requestPermission();
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
