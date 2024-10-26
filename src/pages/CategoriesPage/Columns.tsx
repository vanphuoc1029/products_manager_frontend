import { ColumnDef } from "@tanstack/react-table";

export type Categories = {
  id: number;
  name: string;
};

export const Columns: ColumnDef<Categories>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên danh mục",
  },
];
