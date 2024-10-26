import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { LogsIcon } from "lucide-react";

export type Invoice = {
  id: number;
  createAt: Date;
};

export const Columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createAt",
    header: "Ngày giờ tạo",
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.original.createAt),
        "dd/MM/yyyy HH:mm:ss"
      );
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "detail",
    header: "Chi tiết",
    cell: ({ row }) => {
      return flexRender(
        <Link to={`/invoices/view/${row.original.id}`}>
          <LogsIcon />
        </Link>,
        row.original
      );
    },
  },
];
