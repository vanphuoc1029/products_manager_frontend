import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Products = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="bg-white w-full justify-end"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Giá</span>
          <ArrowUp
            className="ml-2"
            style={{
              transform:
                column.getIsSorted() === "asc"
                  ? "rotate(0deg)"
                  : "rotate(180deg)",
            }}
          />
        </Button>
      );
    },

    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(row.getValue("price"));
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Tồn kho",
  },
];
