import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSessionValidation = (sessionKey: string, redirectTo: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionValue = sessionStorage.getItem(sessionKey);
    if (sessionValue !== 'true') {
      navigate(redirectTo, { replace: true });
    }
  }, [sessionKey, redirectTo, navigate]);
};

export default useSessionValidation;
