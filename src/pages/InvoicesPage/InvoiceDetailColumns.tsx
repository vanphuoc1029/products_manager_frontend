import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/helperFunction/formating";

type InvoiceDetail = {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
};

export const Columns: ColumnDef<InvoiceDetail>[] = [
  {
    accessorKey: "product.name",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "quantity",
    header: "Số lượng",
  },
  {
    accessorKey: "product.price",
    header: "Giá",
    cell: ({ row }) => {
      return <span>{formatCurrency(row.original.product.price)}</span>;
    },
  },
  {
    accessorKey: "total",
    header: "Tổng",
    cell: ({ row }) => {
      return (
        <span>
          {formatCurrency(row.original.quantity * row.original.product.price)}
        </span>
      );
    },
  },
];
