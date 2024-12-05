import { useEffect } from "react";
import { useGetMyUser } from "@/apis/LoginApi";

const UserValidation = () => {
  const { currentUser, isLoading } = useGetMyUser();
  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/login";
    }
  }, [currentUser]);
  return isLoading;
};

export default UserValidation;
