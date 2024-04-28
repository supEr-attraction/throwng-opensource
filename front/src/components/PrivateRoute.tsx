import { getIsLogin } from "@/utils/getIsLogin";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const isLogin = getIsLogin();

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoutes;
