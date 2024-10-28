import { Columns } from "./UsersColumns";
import { DataTable } from "../../components/DataTable";
import { useState } from "react";
import { useCreateUser, useDeleteUser, useGetUsers } from "@/apis/UsersApi";
import AddForm from "./AddUserForm";
import TableSkeleton from "@/components/TableSkeleton";

const CategoriesPage = () => {
  const { usersData, isLoading: isGetLoading } = useGetUsers();

  const {
    createUserApi,
    isLoading: isCreateLoading,
    isSuccess,
    isError,
  } = useCreateUser();

  const [isAddPage, setIsAddPage] = useState(false);

  const handleAdd = () => {
    setIsAddPage(true);
  };

  const handleCancel = () => {
    setIsAddPage(false);
  };

  const { deleteUserApi } = useDeleteUser();
  const handleDelete = (id: string) => {
    const result = confirm("Bạn có chắc chắn xóa thông tin này chứ?");
    if (result) {
      deleteUserApi(id, {
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

  return (
    <div style={{ width: "70vw" }} className="space-x-3">
      <header className="flex h-14 items-center gap-4 border-b bg-white px-6 dark:bg-gray-950 ">
        <span className="text-base font-semibold">Người dùng</span>
        <div className="ml-auto flex w-full md:w-auto relative"></div>
      </header>
      {isAddPage ? (
        <AddForm
          onSubmit={createUserApi}
          isError={isError}
          isLoading={isCreateLoading}
          isSuccess={isSuccess}
          handleCancel={handleCancel}
        />
      ) : isGetLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          data={usersData || []}
          columns={Columns}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
