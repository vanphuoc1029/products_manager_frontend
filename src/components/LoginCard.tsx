import { UserLogin } from "@/apis/LoginApi";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "./ui/card";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Tên đăng nhập phải có ít nhất 1 ký tự" }),
  password: z.string().min(1, { message: "Mật khẩu phải có ít nhất 1 ký tự" }),
});

export type UserLoginForm = z.infer<typeof formSchema>;

type Props = {
  onSave: (user: UserLogin) => void;
  isLoading: boolean;
  isError: boolean;
};

const LoginCard = ({ onSave, isLoading, isError }: Props) => {
  const form = useForm<UserLoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
            <CardDescription>
              Nhập tên đăng nhập và mật khẩu để truy cập vào hệ thống!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel>
                        <span>Tên đăng nhập</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nhập tên đăng nhập" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel>
                        <span>Mật khẩu</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading" : "Đăng nhập"}
              </Button>
              {isError && (
                <span className="text-red-500 text-sm">
                  Tên đăng nhập hoặc mật khẩu không đúng
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default LoginCard;
