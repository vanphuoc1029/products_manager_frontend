import { DataTable } from "@/components/DataTable";
import { useGetInvoceDetail } from "@/apis/InvoicesApi";
import { useParams, useNavigate } from "react-router-dom";
import { Columns } from "./InvoiceDetailColumns";
import UserValidation from "@/helperFunction/userValidation";

const InvoiceDetailPage = () => {
  const isGetUserLoading = UserValidation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const handleExport = (id: string) => {
    navigate(`/invoices/export/${id}`);
  };
  if (id) {
    const { invoiceDetailData, isLoading: isGetAllLoading } =
      useGetInvoceDetail(id);
    return isGetUserLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div style={{ width: "70vw" }} className="space-x-3">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-6 dark:bg-gray-950 ">
          <span className="text-base font-semibold">Chi tiết hóa đơn</span>
          <div className="ml-auto flex w-full md:w-auto relative"></div>
        </header>
        {isGetAllLoading ? (
          <h1>Loading...</h1>
        ) : (
          <DataTable
            columns={Columns}
            data={invoiceDetailData || []}
            isSearching={false}
            isAdd={false}
            isEdit={false}
            isDelete={false}
            isExport={true}
            handleExport={() => handleExport(id)}
          />
        )}
      </div>
    );
  } else {
    navigate("/invoices");
  }
};

export default InvoiceDetailPage;
