import kakaoLogin from "@assets/images/kakaoLogin.webp";

const SocialKakao = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_API;
  const redirect_uri = `${import.meta.env.VITE_BASE_URL}/login/KAKAO`; //Redirect URI

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <img
      src={kakaoLogin}
      alt="카카오로그인"
      className="login-btn"
      onClick={handleLogin}
    />
  );
};
export default SocialKakao;
