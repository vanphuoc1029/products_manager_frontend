import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export type CreateInvoiceDetail = {
  productId: string;
  quantity: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type Invoice = {
  createAt: string;
};

export type GetInvoiceDetail = {
  quantity: number;
  invoice: Invoice;
  product: Product;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const useGetAllInvoices = () => {
  const getAllInvoicesRequest = async () => {
    const response = await fetch(`${BASE_URL}/invoices`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch invoices");
    }
    return await response.json();
  };

  const {
    data: invoicesData,
    isError,
    isLoading,
    isSuccess,
  } = useQuery("invoices", getAllInvoicesRequest);
  return { invoicesData, isError, isLoading, isSuccess };
};

export const useCreateInvoice = () => {
  const navigate = useNavigate();
  const createInvoiceRequest = async (body: CreateInvoiceDetail[]) => {
    const response = await fetch(`${BASE_URL}/invoices`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to create invoice");
    }
    return await response.json();
  };

  const {
    mutateAsync: createInvoiceApi,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(createInvoiceRequest);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lưu hóa đơn thành công");
      navigate("/invoices");
    }
    if (isError) {
      toast.error("Lưu hóa đơn thất bại");
    }
  }, [isSuccess, isError, navigate]);

  return { createInvoiceApi, isError, isLoading, isSuccess };
};

export const useDeleteInvoice = () => {
  const deleteInvoiceRequest = async (id: string) => {
    const response = await fetch(`${BASE_URL}/invoices/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete invoice");
    }
  };

  const {
    mutateAsync: deleteInvoiceApi,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(deleteInvoiceRequest);

  return { deleteInvoiceApi, isError, isLoading, isSuccess };
};

type updateInvoiceProps = {
  id: string;
  productQuantity: CreateInvoiceDetail[];
};

export const useUpdateInvoice = () => {
  const updateInvoiceRequest = async ({
    id,
    productQuantity: body,
  }: updateInvoiceProps) => {
    const response = await fetch(`${BASE_URL}/invoices/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to update invoice");
    }
    return await response.json();
  };

  const {
    mutateAsync: updateInvoiceApi,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(updateInvoiceRequest);

  return { updateInvoiceApi, isError, isLoading, isSuccess };
};

export const useGetInvoceDetail = (id: string) => {
  const getInvoiceDetailRequest = async () => {
    const response = await fetch(`${BASE_URL}/invoices/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch invoice detail");
    }
    return await response.json();
  };
  const {
    data: invoiceDetailData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<GetInvoiceDetail[]>("invoiceDetail", getInvoiceDetailRequest);
  return { invoiceDetailData, isLoading, isError, isSuccess };
};
