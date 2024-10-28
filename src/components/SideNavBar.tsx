import { Link, useLocation } from "react-router-dom";
import PackageIcon from "./icons/PackedIcon";
import LogoIcon from "./icons/LogoIcon";
import HomeIcon from "./icons/HomeIcon";
import UsersIcon from "./icons/UsersIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import SettingsIcon from "./icons/SettingsIcon";

const SideNavBar = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname.startsWith(path)
      ? "flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50";
  };

  return (
    <>
      <div className="flex h-[60px] items-center border-b px-6">
        <Link to="#" className="flex items-center gap-2 font-semibold">
          <LogoIcon className="h-6 w-6" />
          <span className="">HaiYen Inc</span>
        </Link>
      </div>
      <nav className="grid items-start px-4 text-sm font-medium">
        <Link to="/home" className={getLinkClass("/home")}>
          <HomeIcon className="h-4 w-4" />
          Trang Chủ
        </Link>
        <Link to="/users" className={getLinkClass("/users")}>
          <UsersIcon className="h-4 w-4" />
          Người Dùng
        </Link>
        <Link to="/products" className={getLinkClass("/products")}>
          <PackageIcon className="h-4 w-4" />
          Sản Phẩm
        </Link>
        <Link to="/invoices" className={getLinkClass("/invoices")}>
          <ShoppingCartIcon className="h-4 w-4" />
          Hóa đơn
        </Link>
        <Link to="settings" className={getLinkClass("/settings")}>
          <SettingsIcon className="h-4 w-4" />
          Cài đặt
        </Link>
      </nav>
    </>
  );
};

export default SideNavBar;
