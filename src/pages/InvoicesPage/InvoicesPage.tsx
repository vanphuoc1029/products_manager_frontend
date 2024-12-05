import { DataTable } from "@/components/DataTable";
import { Columns } from "./InvoicesColumns";
import { useDeleteInvoice, useGetAllInvoices } from "@/apis/InvoicesApi";
import { useNavigate } from "react-router-dom";
import UserValidation from "@/helperFunction/userValidation";

const InvoicesPage = () => {
  const isGetUserLoading = UserValidation();
  const { invoicesData, isLoading: isGetAllLoading } = useGetAllInvoices();

  const { deleteInvoiceApi } = useDeleteInvoice();
  const redirect = useNavigate();

  const handleAdd = () => {
    redirect("/invoices/add");
  };
  const handleDelete = (id: string) => {
    const result = confirm("Xác nhận xóa mọi thông tin của hóa đơn này ?");
    if (result) {
      deleteInvoiceApi(id, {
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
    <h1>Loading...</h1>
  ) : (
    <div style={{ width: "70vw" }} className="space-x-3">
      <header className="flex h-14 items-center gap-4 border-b bg-white px-6 dark:bg-gray-950 ">
        <span className="text-base font-semibold">Hóa đơn</span>
        <div className="ml-auto flex w-full md:w-auto relative"></div>
      </header>
      {isGetAllLoading ? (
        <h1>Loading...</h1>
      ) : (
        <DataTable
          columns={Columns}
          data={invoicesData}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          isSearching={false}
        />
      )}
    </div>
  );
};

export default InvoicesPage;
