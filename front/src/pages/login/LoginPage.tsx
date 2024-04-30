import logo from "@assets/images/logo.png";
import SocialKakao from "@components/auth/SocialKakao";
import "@styles/LoginPage.scss";

const LoginPage = () => {
  // localStorage.setItem(
  //   "jwt",
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzNDU2NjQ4NDMyIiwic3ViIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE3MTQyODM0NjIsImV4cCI6MTcxNjg3NTQ2Mn0.ay6RpsPdE_4sHLBCOixggPFi397jpQ0LNyu0vtpj-vg"
  // );

  // localStorage.setItem(
  //   // 민준 토큰
  //   "jwt",
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzNDU4NzgzODI4Iiwic3ViIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE3MTQzOTE3MTMsImV4cCI6MTcxNjk4MzcxM30.96m_dNQn0fT4QGvU8Yg3YnQPJyTfYxP4SXafGTCOS-Y"
  // );

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
