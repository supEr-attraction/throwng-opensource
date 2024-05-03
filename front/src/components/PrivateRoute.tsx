import fetchLocationPermissionStatus from "@/utils/fetchLocationPermissionStatus";
import { getIsLogin } from "@/utils/getIsLogin";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function PrivateRoutes() {
  const isLogin = getIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) return;

    const checkPermissions = async () => {
      const status = await fetchLocationPermissionStatus();
      if (!["granted", "prompt"].includes(status)) {
        navigate("none-permission", { replace: true });
      }
    };

    checkPermissions();
  }, []);

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoutes;
