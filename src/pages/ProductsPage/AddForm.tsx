import {
  Form,
  FormLabel,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Products } from "@/apis/ProductsApi";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useGetCategories } from "@/apis/CategoriesApi";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";

type Category = {
  id: number;
  name: string;
};

type Props = {
  onSubmit: (data: Products) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  product?: Products;
  handleCancel?: () => void;
};

const AddForm = ({
  onSubmit,
  isLoading,
  isError,
  isSuccess,
  product,
  handleCancel: handleCancel,
}: Props) => {
  const formSchema = z.object({
    id: z.string().min(1, { message: "ID không được để trống" }),
    name: z.string().min(1, { message: "Tên sản phẩm không được để trống" }),
    price: z.coerce
      .number()
      .min(0, { message: "Giá sản phẩm không được để trống" }),
    stock: z.coerce.number().min(0).optional(),
    category: z.string().min(1, { message: "Danh mục không được để trống" }),
    description: z.string().optional(),
  });

  type ProductForm = z.infer<typeof formSchema>;

  const { categoriesData, isLoading: isGetCategoriesLoading } =
    useGetCategories();

  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id || "",
      name: product?.name || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      category: product?.category || "",
      description: product?.description || "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        id: "",
        name: "",
        price: 0,
        stock: 0,
        category: "",
        description: "",
      });
    }
  }, [isSuccess, form]);

  return isGetCategoriesLoading ? (
    <h1> Loading...</h1>
  ) : (
    <div className="p-4 bg-gray-100 rounded-md m-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã sản phẩm</FormLabel>
                <Input
                  {...field}
                  placeholder="Nhập mã sản phẩm"
                  className="w-1/2 bg-white"
                  defaultValue={product?.id}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên sản phẩm</FormLabel>

                <Input
                  {...field}
                  placeholder="Nhập tên sản phẩm"
                  className="w-1/2 bg-white"
                  defaultValue={product?.name}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Danh mục</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={product?.category}
                >
                  <FormControl>
                    <SelectTrigger className="w-1/2 bg-white">
                      <SelectValue placeholder="Lựa chọn danh mục sản phẩm" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesData.map((category: Category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá</FormLabel>

                <Input
                  {...field}
                  placeholder="Nhập giá sản phẩm"
                  className="w-1/2 bg-white"
                  defaultValue={product?.price}
                  type="number"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng</FormLabel>
                <Input
                  {...field}
                  placeholder="Nhập số lượng sản phẩm"
                  className="w-1/2 bg-white"
                  defaultValue={product?.stock}
                  type="number"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <Textarea
                  {...field}
                  placeholder="Nhập mô tả sản phẩm"
                  defaultValue={product?.description}
                  className="bg-white"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row mt-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang tải..." : "Lưu sản phẩm"}
            </Button>{" "}
            {isError && (
              <span className="text-red-500">
                Đã xảy ra lỗi khi lưu sản phẩm
              </span>
            )}
            {isSuccess && (
              <span className="text-green-500 text-base ml-4">
                Lưu sản phẩm thành công
              </span>
            )}
            <Button onClick={handleCancel} className="ml-auto">
              Cancle
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddForm;
