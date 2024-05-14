import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getIsLogin } from "@/utils/getIsLogin";
import checkPermission from "@/utils/permission/checkPermission";

function PrivateRoutes() {
  const isLogin = getIsLogin();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    const verifyPermission = async () => {
      try {
        const isPermission = await checkPermission();
        if (pathname === "/none-permission" && isPermission) {
          navigate("/", { replace: true });
        } else if (pathname !== "/none-permission" && !isPermission) {
          navigate("/none-permission", { replace: true });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsCheck(true);
      }
    };

    if (isLogin) {
      verifyPermission();
    }
  }, []);

  return isLogin ? (
    isCheck ? (
      <Outlet />
    ) : null
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoutes;
