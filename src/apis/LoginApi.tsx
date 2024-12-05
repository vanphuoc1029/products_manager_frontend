import { useMutation, useQuery } from "react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type UserLogin = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const loginRequest = async (userLogin: UserLogin) => {
    const { username, password } = userLogin;
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      if (response.status == 404) {
        throw new Error("User not found");
      }
      if (response.status == 400) {
        throw new Error("Password incorrect");
      }
    }
    const text = await response.text();
    const data = JSON.parse(text);
    localStorage.setItem("token", data.access_token);
    return data;
  };

  const {
    mutateAsync: loginApi,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(loginRequest);

  return { loginApi, isLoading, isError, isSuccess };
};

export const useGetMyUser = () => {
  const getMyUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/users/getMyUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("User not found");
    }

    return await response.json();
  };

  const { data, isLoading, isError } = useQuery("myUser", getMyUser, {
    retry: 0,
  });
  return { currentUser: data, isLoading, isError };
};
