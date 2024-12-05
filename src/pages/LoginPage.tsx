import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, useGetMyUser } from "@/apis/LoginApi";
import LoginCard from "@/components/LoginCard";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    loginApi,
    isLoading,
    isError,
    isSuccess: isLoginSuccess,
  } = useLogin();
  const { currentUser, isLoading: isGetMyUserLoading } = useGetMyUser();

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/products");
    }
  }, [isLoginSuccess, navigate]);

  useEffect(() => {
    if (currentUser) {
      navigate("/products");
    }
  }, [currentUser, navigate]);

  if (isGetMyUserLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col justify-center w-screen h-screen">
      <LoginCard onSave={loginApi} isError={isError} isLoading={isLoading} />
    </div>
  );
};

export default LoginPage;
