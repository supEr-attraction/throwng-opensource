import logo from "@assets/images/logo.png";
import SocialKakao from "@components/SocialKakao";
import "@styles/LoginPage.scss";

const LoginPage = () => {
  localStorage.setItem(
    "jwt",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzNDU2NjQ4NDMyIiwic3ViIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE3MTQyODM0NjIsImV4cCI6MTcxNjg3NTQ2Mn0.ay6RpsPdE_4sHLBCOixggPFi397jpQ0LNyu0vtpj-vg"
  );

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
