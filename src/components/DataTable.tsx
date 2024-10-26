import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "./ui/table";

import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SearchIcon from "@/components/icons/SearchIcon";
import { EditIcon, TrashIcon } from "lucide-react";

import { Link } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleAdd?: () => void;
  handleDelete?: (id: string) => void;
  isSearching?: boolean;
  isAdd?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  isExport?: boolean;
  handleExport?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleAdd,
  handleDelete,
  isSearching = true,
  isAdd = true,
  isEdit = true,
  isDelete = true,
  isExport = false,
  handleExport,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  return (
    <>
      <div className="flex flex-row items-center justify-between my-3">
        {isAdd && (
          <Button className="px-6 my-2 bg-green-600" onClick={handleAdd}>
            Add
          </Button>
        )}

        {isExport && (
          <Button className="px-6 my-2 bg-blue-600" onClick={handleExport}>
            Xuất báo giá
          </Button>
        )}

        <div className="relative flex-grow flex justify-start">
          {isSearching && (
            <div className="relative flex-grow flex justify-start ml-20">
              <SearchIcon className="relative left-5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Lọc theo tên ..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className=" w-full md:w-[400px] bg-white shadow-none appearance-none pl-8 dark:bg-gray-950 space-y-auto"
              />
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-slate-800 text-white outline text-sm p-2 my-2 ml-auto">
            Chọn cột hiển thị
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {isEdit && isDelete && (
                    <TableCell className="flex flex-row justify-end space-x-2">
                      <Link to={`edit/${row.getValue("id")}`}>
                        <EditIcon className="w-5 h-5 cursor-pointer mr-2 text-orange-400 " />
                      </Link>
                      {handleDelete && (
                        <TrashIcon
                          className="w-5 h-5 cursor-pointer text-red-400"
                          onClick={() => handleDelete(row.getValue("id"))}
                        />
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không tìm thấy dữ liệu phù hợp
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span>&lt;</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span>&gt;</span>
        </Button>
      </div>
    </>
  );
}
