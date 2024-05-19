import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCode } from "@services/login";
// import Loading from "@pages/payment/Loading";

const AuthPage = () => {
  const { provider } = useParams();
  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      try {
        if (provider && code) {
          const data = await getCode(provider, code);
          localStorage.setItem("jwt", data.accessToken);
          navigate("/", { replace: true });
        } else {
          throw new Error("Provider or code missing");
        }
      } catch (error) {
        console.error("Error while getting token:", error);
        throw new Error('AuthPage');
      }
    };

    getToken();
  }, []);

  return <></>;
};

export default AuthPage;
