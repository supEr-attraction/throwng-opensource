import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getIsLogin } from "@/utils/getIsLogin";
import checkPermission from "@/utils/permission/checkPermission";
// import { useSetRecoilState } from "recoil";
// import { prevPathState, zoomLevelState } from "@store/map/atoms";

function PrivateRoutes() {
  const isLogin = getIsLogin();
  const [isCheck, setIsCheck] = useState(false);
  // const setPrevPath = useSetRecoilState(prevPathState);
  // const setZoomLevel = useSetRecoilState(zoomLevelState);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const locationRef = useRef(pathname);

  useEffect(() => {
    locationRef.current = pathname; // 컴포넌트가 렌더링될 때마다 최신 location으로 업데이트합니다.
  }, [pathname]);

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

    // const match = useMatch("/music/pick/:id");

    // const handleBackNavigation = () => {
    //   console.log(locationRef.current);
    //   if (locationRef.current === "/") {
    //     // setZoomLevel(0);
    //     console.log(locationRef.current);
    //   }
    //   console.log(locationRef.current);
    //   // setPrevPath(locationRef.current);
    // };

    // window.addEventListener("popstate", handleBackNavigation);

    // return () => {
    //   window.removeEventListener("popstate", handleBackNavigation);
    // };
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
