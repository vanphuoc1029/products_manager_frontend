import LoginCard from "../components/LoginCard";
import { useLogin } from "../apis/LoginApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginApi, isLoading, isError, isSuccess } = useLogin();

  useEffect(() => {
    if (isSuccess) {
      navigate("/products");
    }
  }, [isSuccess]);
  return (
    <div className="flex flex-col justify-center w-screen h-screen">
      <LoginCard onSave={loginApi} isError={isError} isLoading={isLoading} />
    </div>
  );
};

export default LoginPage;
