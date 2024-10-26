import { Link, useLocation } from "react-router-dom";

const ProductsHeader = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-base font-semibold text-black"
      : "text-base font-normal text-gray-500";
  };
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-6 dark:bg-gray-950 ">
      <Link to="/products">
        <h1 className={getLinkClass("/products")}>Sản phẩm</h1>
      </Link>
      <Link to="/categories">
        <h1 className={getLinkClass("/categories")}>Danh mục</h1>
      </Link>
    </header>
  );
};

export default ProductsHeader;
