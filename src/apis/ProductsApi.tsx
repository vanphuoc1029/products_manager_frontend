import { useMutation, useQuery } from "react-query";

export type Products = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAddProduct = () => {
  const addProductRequest = async (product: Products) => {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Add product failed");
    }
  };

  const {
    mutateAsync: addProductApi,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(addProductRequest);
  return { addProductApi, isLoading, isSuccess, isError };
};

export const useGetProducts = () => {
  const getProductsRequest = async () => {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Products not found");
    }
    return await response.json();
  };
  const {
    data: productsData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<Products[]>("getProducts", getProductsRequest);
  return { productsData, isLoading, isSuccess, isError };
};

export const useGetProductById = (id: string) => {
  const getProductByIdRequest = async () => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Product not found");
    }
    return await response.json();
  };
  const {
    data: productData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery("getProductById", getProductByIdRequest, {
    cacheTime: 0,
    staleTime: 0,
    keepPreviousData: false,
  });
  return { productData, isLoading, isSuccess, isError };
};

export const useUpdateProduct = (id: string) => {
  const updateProductRequest = async (product: Products) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Update product failed");
    }
  };
  const {
    mutateAsync: updateProductApi,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(updateProductRequest);

  return { updateProductApi, isLoading, isSuccess, isError };
};

export const useDeleteProduct = () => {
  const deleteProductRequest = async (id: string) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Delete product failed");
    }
  };
  const {
    mutateAsync: deleteProductApi,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(deleteProductRequest);

  return { deleteProductApi, isError, isLoading, isSuccess };
};
