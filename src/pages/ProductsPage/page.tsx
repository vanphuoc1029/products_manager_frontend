import ProductsHeader from "@/components/ProductsHeader";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import {
  useAddProduct,
  useGetProducts,
  useDeleteProduct,
} from "@/apis/ProductsApi";
import { useState } from "react";
import AddForm from "./AddForm";

const ProductsPage = () => {
  const { productsData, isLoading: isGetAllLoading } = useGetProducts();
  const {
    addProductApi,
    isError: isAddError,
    isLoading: isAddLoading,
    isSuccess: isAddSuccess,
  } = useAddProduct();
  const [isAdd, setIsAdd] = useState(false);

  const { deleteProductApi } = useDeleteProduct();
  const handleDelete = (id: string) => {
    const result = confirm("Bạn có chắc chắn xóa thông tin này chứ?");
    if (result) {
      deleteProductApi(id, {
        onSuccess: () => {
          alert("Xóa thành công");
          window.location.reload();
        },
        onError: () => {
          alert("Xóa thất bại");
        },
      });
    }
  };

  const handleAdd = () => {
    setIsAdd(true);
  };

  const handleCancel = () => {
    setIsAdd(false);
  };
  return (
    <div style={{ width: "70vw" }} className="space-x-3">
      <ProductsHeader />

      {isAdd ? (
        <AddForm
          onSubmit={addProductApi}
          isError={isAddError}
          isLoading={isAddLoading}
          isSuccess={isAddSuccess}
          handleCancel={handleCancel}
        />
      ) : isGetAllLoading ? (
        <span>Loading...</span>
      ) : (
        <DataTable
          columns={columns}
          data={productsData || []}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductsPage;
