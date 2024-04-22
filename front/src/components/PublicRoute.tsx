import { Navigate, Outlet } from "react-router-dom";
// import getIsLogin from './getIsLogin'

function PublicRoute() {
  // const isLogined = getIsLogin()
  const isLogin = false;

  return isLogin ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
