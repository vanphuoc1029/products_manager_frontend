import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

const NavBar = () => {
  return (
    <div className="flex flex-row justify-evenly py-4  rounded-lg">
      <div>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="bg-white">
        <DropdownMenu>
          <DropdownMenuTrigger>Sản phẩm</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link to="/products">Mặt hàng</Link>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <Link to="/categories">Danh mục</Link>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Link to="clients">Khách hàng</Link>
      </div>
      <div>
        <Link to="orders">Đơn hàng</Link>
      </div>
      <div>
        <Link to="users">Thông tin</Link>
      </div>
    </div>
  );
};

export default NavBar;
