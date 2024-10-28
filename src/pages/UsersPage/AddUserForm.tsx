import { Form, FormLabel, FormItem, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserBody, User } from "@/apis/UsersApi";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  onSubmit: (data: CreateUserBody) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  user?: User;
  handleCancel: () => void;
};

const AddForm = ({
  onSubmit,
  isLoading,
  isError,
  isSuccess,
  user,
  handleCancel,
}: Props) => {
  const formSchema = z.object({
    fullName: z.string().min(1, { message: "Tên đầy đủ không được để trống" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    username: z
      .string()
      .min(1, { message: "Tên đăng nhập không được để trống" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  });

  type UserForm = z.infer<typeof formSchema>;

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: user?.fullName, email: user?.email },
  });

  useEffect(() => {
    if (isSuccess) {
      form.setValue("fullName", "");
      form.setValue("email", "");
    }
  }, [isSuccess, form]);

  return (
    <div className="p-4 bg-gray-100 rounded-md m-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên đăng nhập</FormLabel>

                <Input
                  {...field}
                  placeholder="Nhập tên danh mục"
                  className="w-1/2 bg-white"
                  defaultValue={user?.username}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  {...field}
                  placeholder="Nhập email"
                  className="w-1/2 bg-white"
                  defaultValue={user?.email}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ tên đầy đủ</FormLabel>
                <Input
                  {...field}
                  placeholder="Nhập tên đầy đủ"
                  className="w-1/2 bg-white"
                  defaultValue={user?.fullName}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <Input
                  {...field}
                  placeholder="Nhập mật khẩu"
                  className="w-1/2 bg-white"
                  type="password"
                />
              </FormItem>
            )}
          />

          <div className="flex flex-row mt-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang tải..." : "Lưu sản phẩm"}
            </Button>
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
