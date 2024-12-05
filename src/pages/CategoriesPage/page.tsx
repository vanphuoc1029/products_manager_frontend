import ProductsHeader from "@/components/ProductsHeader";
import { Columns } from "@/pages/CategoriesPage/Columns";
import { DataTable } from "../../components/DataTable";
import { useState } from "react";
import {
  useCreateCategory,
  useGetCategories,
  useDeleteCategory,
} from "@/apis/CategoriesApi";
import AddForm from "./AddForm";
import TableSkeleton from "@/components/TableSkeleton";
import userValidaton from "@/helperFunction/userValidation";

const CategoriesPage = () => {
  const isGetUserLoading = userValidaton();
  const {
    categoriesData,
    isLoading: isGetLoading,
    // isError: isGetError,
  } = useGetCategories();

  const {
    createCategoryApi,
    isLoading: isCreateLoading,
    isSuccess,
    isError,
  } = useCreateCategory();

  const [isAddPage, setIsAddPage] = useState(false);

  const handleAdd = () => {
    setIsAddPage(true);
  };

  const handleCancel = () => {
    setIsAddPage(false);
  };

  const { deleteCategoryApi } = useDeleteCategory();
  const handleDelete = (id: string) => {
    const result = confirm("Bạn có chắc chắn xóa thông tin này chứ?");
    if (result) {
      deleteCategoryApi(id, {
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

  return isGetUserLoading ? (
    <span>Loading...</span>
  ) : (
    <div style={{ width: "70vw" }} className="space-x-3">
      <ProductsHeader />
      {isAddPage ? (
        <AddForm
          onSubmit={createCategoryApi}
          isError={isError}
          isLoading={isCreateLoading}
          isSuccess={isSuccess}
          handleCancel={handleCancel}
        />
      ) : isGetLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          data={categoriesData}
          columns={Columns}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
