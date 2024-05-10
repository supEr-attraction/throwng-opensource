import { lazy } from "react";
import PublicRoute from "@components/PublicRoute";
const LoginPage = lazy(() => import("@pages/login/LoginPage"));
const AuthPage = lazy(() => import("@pages/login/AuthPage"));
const Error404 = lazy(() => import("@pages/Error404"));

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
  errorElement: <Error404 />,
};
