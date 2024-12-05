import { useEffect } from "react";
import { useGetMyUser } from "@/apis/LoginApi";
import { useNavigate } from "react-router-dom";

const UserValidation = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  return isLoading;
};

export default UserValidation;
