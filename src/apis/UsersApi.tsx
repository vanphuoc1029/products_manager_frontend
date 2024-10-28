import { useMutation, useQuery } from "react-query";

export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("token");

export const useGetUsers = () => {
  const getUsersRequest = async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  };

  const {
    data: usersData,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<User[]>("users", getUsersRequest);
  return { usersData, isError, isLoading, isSuccess };
};

export type CreateUserBody = {
  username: string;
  email: string;
  fullName: string;
  password: string;
};
export const useCreateUser = () => {
  const createUserRequest = async (body: CreateUserBody) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return await response.json();
  };

  const { mutate, isLoading, isSuccess, isError } =
    useMutation(createUserRequest);
  return { createUserApi: mutate, isLoading, isSuccess, isError };
};

export const useDeleteUser = () => {
  const deleteUserRequest = async (id: string) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return await response.json();
  };

  const { mutate, isLoading, isSuccess, isError } =
    useMutation(deleteUserRequest);
  return { deleteUserApi: mutate, isLoading, isSuccess, isError };
};

type updateUserProps = {
  id: number;
  body: User;
};

export const useUpdateUser = () => {
  const updateUserRequest = async (updateBody: updateUserProps) => {
    const { id, body } = updateBody;
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return await response.json();
  };

  const { mutate, isLoading, isSuccess, isError } =
    useMutation(updateUserRequest);
  return { updateUserApi: mutate, isLoading, isSuccess, isError };
};

export const useGetUserById = (id: number) => {
  const getUserByIdRequest = async () => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  };
  const {
    data: userData,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<User>("user", getUserByIdRequest);
  return { userData, isError, isLoading, isSuccess };
};
