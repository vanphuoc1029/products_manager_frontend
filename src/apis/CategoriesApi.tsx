import { useQuery, useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type Category = {
  name: string;
};

export const useGetCategories = () => {
  const getCategoriesRequest = async () => {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Categories not found");
    }
    return await response.json();
  };

  const {
    data: categoriesData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("categories", getCategoriesRequest);
  return { categoriesData, isLoading, isError, isSuccess };
};

export const useCreateCategory = () => {
  const createCategoryRequest = async (category: Category) => {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error("Create category failed");
    }
    return await response.json();
  };

  const {
    mutateAsync: createCategoryApi,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(createCategoryRequest);
  return { createCategoryApi, isLoading, isSuccess, isError };
};

export const useUpdateCategory = (id: string) => {
  const editCategoryRequest = async (category: Category) => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error("Edit category failed");
    }
    return await response.json();
  };

  const {
    mutateAsync: editCategoryApi,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(editCategoryRequest);
  return { editCategoryApi, isLoading, isSuccess, isError };
};

export const useGetCategoryById = (id: string) => {
  const getCategoryByIdRequest = async () => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Category not found");
    }
    return await response.json();
  };

  const {
    data: categoryData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("category", getCategoryByIdRequest, {
    keepPreviousData: false,
    staleTime: 0,
    cacheTime: 0,
  });
  return { categoryData, isLoading, isError, isSuccess };
};

export const useDeleteCategory = () => {
  const deleteCategoryRequest = async (id: string) => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Delete category failed");
    }
    return await response.json();
  };

  const {
    mutateAsync: deleteCategoryApi,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(deleteCategoryRequest);
  return { deleteCategoryApi, isLoading, isSuccess, isError };
};
