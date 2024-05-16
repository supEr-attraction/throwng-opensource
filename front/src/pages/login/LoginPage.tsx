import logo from "@assets/images/logo.webp";
import SocialKakao from "@components/auth/SocialKakao";
import "@styles/LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <SocialKakao />
    </div>
  );
};

export default LoginPage;
