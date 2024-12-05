import { useParams } from "react-router-dom";
import { useGetInvoceDetail } from "@/apis/InvoicesApi";
import { GetInvoiceDetail } from "@/apis/InvoicesApi";
import { formatCurrency } from "@/helperFunction/formating";
import { PrinterIcon } from "lucide-react";
import UserValidation from "@/helperFunction/userValidation";

const InvoicesExportPage = () => {
  const isGetUserLoading = UserValidation();
  const { id } = useParams<{ id: string }>();
  if (id) {
    const { invoiceDetailData, isLoading: isGetAllLoading } =
      useGetInvoceDetail(id);
    return isGetUserLoading ? (
      <span>Loading...</span>
    ) : (
      !isGetAllLoading && (
        <div className=" w-screen">
          <div className="flex flex-row items-center justify-center">
            <div className="w-1/4">
              <img src="/logo.png" className="ml-auto h-1/4 w-1/4" />
            </div>
            <div className="flex flex-col ml-4">
              <h2 className="text-xl text-blue-600 font-semibold">
                HAI YEN MARINE & OFFSHORE
              </h2>
              <p className="text-sm font-semibold tracking-tight">
                Địa chỉ: 108 Trần Đình Xu, phường Nguyễn Cư Trinh, Quận 1, TP.
                Hồ Chí Minh
              </p>
              <p className="text-xs font-semibold">ĐT: +84 92721 8686</p>
              <p className="text-xs font-semibold">Website: haiyen.vn</p>
              <p className="text-xs font-semibold">Email: info@haiyen.vn</p>
            </div>
            <div className="w-1/4"></div>
          </div>
          <h1 className="text-xl text-center font-semibold mt-4 text-blue-500">
            BÁO GIÁ{" "}
          </h1>{" "}
          <table className="w-full border-collapse border border-black mt-4">
            <thead>
              <tr>
                <th className="border border-black">STT</th>
                <th className="border border-black">Tên sản phẩm</th>
                <th className="border border-black">Số lượng</th>
                <th className="border border-black">Đơn giá</th>
                <th className="border border-black">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetailData?.map(
                (invoiceDetail: GetInvoiceDetail, index) => (
                  <tr key={index}>
                    <td className="border border-black">{index + 1}</td>
                    <td className="border border-black">
                      {invoiceDetail.product.name}
                    </td>
                    <td className="border border-black">
                      {invoiceDetail.quantity}
                    </td>
                    <td className="border border-black text-right">
                      {formatCurrency(invoiceDetail.product.price)}
                    </td>
                    <td className="border border-black text-right">
                      {formatCurrency(
                        invoiceDetail.product.price * invoiceDetail.quantity
                      )}
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td
                  colSpan={3}
                  className="border border-black text-right font-semibold"
                >
                  Tổng cộng
                </td>
                <td
                  colSpan={2}
                  className="border border-black text-right font-semibold"
                >
                  {formatCurrency(
                    invoiceDetailData?.reduce(
                      (acc, curr) =>
                        acc + (curr.product?.price ?? 0) * (curr.quantity ?? 0),
                      0
                    ) ?? 0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {/* create a print button */}
          <div className="w-full flex justify-end mt-4 no-print ">
            <button
              onClick={() => window.print()}
              className=" text-black px-4 py-2 no-print border border-black mr-4"
            >
              <PrinterIcon />
            </button>
          </div>
        </div>
      )
    );
  }
};

export default InvoicesExportPage;
