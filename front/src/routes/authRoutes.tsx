import { lazy } from "react";

const PublicRoute = lazy(() => import("@components/PublicRoute"));
const LoginPage = lazy(() => import("@pages/LoginPage"));
// const Error404 = loadable(() => import('./Error404'))

export default {
  path: "/",
  element: <PublicRoute />,
  children: [{ path: "login", element: <LoginPage /> }],
  // errorElement: <Error404 />
};
