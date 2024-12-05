import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useGetProducts } from "@/apis/ProductsApi";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/helperFunction/formating";
import { useCreateInvoice, useUpdateInvoice } from "@/apis/InvoicesApi";
import { useParams } from "react-router-dom";
import { useGetInvoceDetail, CreateInvoiceDetail } from "@/apis/InvoicesApi";
import UserValidation from "@/helperFunction/userValidation";

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

type Props = {
  isEdit?: boolean;
};

const AddForm = ({ isEdit = false }: Props) => {
  const isGetUserLoggedIn = UserValidation();
  const { id } = useParams<{ id: string }>();

  const { productsData, isLoading: isGetAllLoading } = useGetProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean[]>([]);

  const { createInvoiceApi, isLoading: isCreateLoading } = useCreateInvoice();
  const { updateInvoiceApi, isLoading: isUpdateLoading } = useUpdateInvoice();
  if (id) {
    const { invoiceDetailData } = useGetInvoceDetail(id);
    useEffect(() => {
      if (invoiceDetailData) {
        if (invoiceDetailData) {
          setProducts(
            invoiceDetailData.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            }))
          );
        }
      }
    }, [invoiceDetailData]);
  }

  const handleOpen = (index: number) => {
    setOpen(open.map((item, idx) => (idx === index ? !item : false)));
  };

  const handleAddProduct = () => {
    setProducts([...products, { id: "", name: "", quantity: 0, price: 0 }]);
    setOpen([...open, false]);
  };

  const handleUpdateProduct = (index: number, updates: Partial<Product>) => {
    setProducts(
      products.map((product, i) =>
        index === i ? { ...product, ...updates } : product
      )
    );
  };

  const handleFormSubmit = () => {
    const productQuantity: CreateInvoiceDetail[] = products
      .filter((product) => product.name != "" && product.quantity != 0)
      .map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      }));
    createInvoiceApi(productQuantity);
  };

  const handleEditSubmit = () => {
    const productQuantity: CreateInvoiceDetail[] = products
      .filter((product) => product.name != "" && product.quantity != 0)
      .map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      }));
    if (id) {
      updateInvoiceApi({ id, productQuantity });
    } else {
      console.error("Invoice ID is undefined");
    }
  };
  const calculateTotal = (product: Product) => {
    return product.quantity * product.price;
  };

  const fields = ["STT", "Tên sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"];

  return isGetAllLoading || (isEdit && isUpdateLoading) || isGetUserLoggedIn ? (
    <h1>Loading...</h1>
  ) : (
    <div style={{ width: "70vw" }} className="space-x-3">
      <header className="flex h-14 items-center gap-4 border-b bg-white px-6 dark:bg-gray-950 ">
        <span className="text-base font-semibold">Hóa đơn</span>
        <div className="ml-auto flex w-full md:w-auto relative"></div>
      </header>
      <div className="my-3 flex flex-row">
        <Button className="bg-green-500" onClick={handleAddProduct}>
          Thêm sản phẩm
        </Button>
        <Button
          className="bg-blue-500 ml-auto"
          type="submit"
          onClick={isEdit ? handleEditSubmit : handleFormSubmit}
          disabled={isCreateLoading || isUpdateLoading}
        >
          {isCreateLoading ? "Loading..." : "Lưu hóa đơn"}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {fields.map((field, index) => (
              <TableHead
                key={index}
                className={
                  field === "Đơn giá" || field === "Thành tiền"
                    ? "text-right"
                    : ""
                }
              >
                {field}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell colSpan={1}>
                <Popover
                  open={open[index]}
                  onOpenChange={() => handleOpen(index)}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open[index]}
                      className="w-[450px] justify-between"
                    >
                      {product.name && productsData
                        ? productsData.find((item) => item.id === product.id)
                            ?.name
                        : "Chọn sản phẩm"}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px]">
                    <Command>
                      <CommandInput placeholder="Tìm sản phẩm..." />
                      <CommandEmpty> Không tìm thấy sản phẩm</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {productsData?.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={() => {
                                handleUpdateProduct(index, {
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                });
                                setOpen(
                                  open.map((item, idx) =>
                                    idx === index ? !item : false
                                  )
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  product.name === item.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell className="text-right">
                <Input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => {
                    handleUpdateProduct(index, {
                      quantity: parseInt(e.target.value),
                    });
                    console.log(products);
                  }}
                  placeholder="Số lượng"
                  className="w-20"
                />
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(
                  productsData?.find((item) => item.id === product.id)?.price ||
                    0
                )}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(calculateTotal(product))}
              </TableCell>
            </TableRow>
          ))}
          {products.length > 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-right font-bold">
                Tổng cộng
              </TableCell>

              <TableCell className="text-right font-semibold">
                {formatCurrency(
                  products.reduce(
                    (acc, product) => acc + calculateTotal(product),
                    0
                  )
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AddForm;
