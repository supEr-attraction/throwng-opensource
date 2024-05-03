import { lazy } from "react";

const PublicRoute = lazy(() => import("@components/PublicRoute"));
const LoginPage = lazy(() => import("@pages/login/LoginPage"));
const AuthPage = lazy(() => import("@pages/login/AuthPage"));
// const Error404 = loadable(() => import('./Error404'))

export default {
  path: "/",
  element: <PublicRoute />,
  children: [
    {
      path: "login",
      children: [
        { index: true, element: <LoginPage /> },
        { path: ":provider", element: <AuthPage /> },
      ],
    },
  ],
  // errorElement: <Error404 />
};
