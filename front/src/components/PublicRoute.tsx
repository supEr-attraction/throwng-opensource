import { getIsLogin } from "@/utils/getIsLogin";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const isLogin = getIsLogin();

  return isLogin ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
