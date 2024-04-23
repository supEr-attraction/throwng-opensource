import { Navigate, Outlet } from "react-router-dom";
// import getIsLogin from './getIsLogin'

function PrivateRoutes() {
  // const isLogined = getIsLogin()
  const isLogin = true;

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoutes;
