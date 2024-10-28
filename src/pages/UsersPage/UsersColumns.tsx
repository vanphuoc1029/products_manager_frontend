import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
};

export const Columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Tên đăng nhập",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "fullName",
    header: "Họ tên",
  },
];
