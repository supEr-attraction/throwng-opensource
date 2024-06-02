import { logoutModalState } from "@store/auth/atom";
import { useSetRecoilState } from "recoil";
import "@styles/myPage/LogoutModal.scss";
import { logout } from "@services/login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutModal = () => {
  const setLogoutModal = useSetRecoilState(logoutModalState);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    // document.body.style.overflow = "auto";
    setLogoutModal(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("jwt");
      handleCloseModal();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      // // throw new Error('LogoutModal');
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="LogoutModal">
      <div className="background" onClick={handleCloseModal} />
      <div className="container">
        <div className="header">
          <div className="title">로그아웃</div>
          <div className="content">로그아웃 하시겠습니까?</div>
        </div>
        <div className="btn">
          <button onClick={handleCloseModal}>아니오</button>
          <button onClick={handleLogout}>예</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
