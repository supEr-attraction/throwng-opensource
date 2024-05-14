import { lazy } from "react";
import PublicRoute from "@components/PublicRoute";
import Error404 from "@pages/Error404";
const LoginPage = lazy(() => import("@pages/login/LoginPage"));
const AuthPage = lazy(() => import("@pages/login/AuthPage"));

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
