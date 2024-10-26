import { Form, FormLabel, FormItem, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/apis/CategoriesApi";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  onSubmit: (data: Category) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  category?: Category;
  handleCancel: () => void;
};

const AddForm = ({
  onSubmit,
  isLoading,
  isError,
  isSuccess,
  category,
  handleCancel,
}: Props) => {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Tên danh mục không được để trống" }),
  });

  type CategoryForm = z.infer<typeof formSchema>;

  const form = useForm<CategoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: category?.name || "" },
  });

  useEffect(() => {
    if (isSuccess) {
      form.setValue("name", "");
    }
  }, [isSuccess, form]);

  return (
    <div className="p-4 bg-gray-100 rounded-md m-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thông tin danh mục</FormLabel>

                <Input
                  {...field}
                  placeholder="Nhập tên danh mục"
                  className="w-1/2 bg-white"
                  defaultValue={category?.name}
                />
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
