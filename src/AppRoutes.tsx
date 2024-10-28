import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage/page";
import SideNavLayout from "./layouts/SideNavLayout";
import CategoriesPage from "./pages/CategoriesPage/page";
import { default as CategoryEditPage } from "./pages/CategoriesPage/EditPage";
import { default as ProductEditPage } from "./pages/ProductsPage/EditPage";
import InvoicesPage from "./pages/InvoicesPage/InvoicesPage";
import InvoiceDetailPage from "./pages/InvoicesPage/InvoiceDetailPage";
import { default as InvoiceAddForm } from "./pages/InvoicesPage/AddForm";
import Testpage from "./pages/InvoicesPage/test";
import InvoicesExportPage from "./pages/InvoicesPage/InvoicesExportPage";
import UsersPage from "./pages/UsersPage/UsersPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/products"
        element={
          <SideNavLayout>
            <ProductsPage />
          </SideNavLayout>
        }
      ></Route>
      <Route
        path="/categories/"
        element={
          <SideNavLayout>
            <CategoriesPage />
          </SideNavLayout>
        }
      />
      <Route
        path="/categories/edit/:id"
        element={
          <SideNavLayout>
            <CategoryEditPage />
          </SideNavLayout>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <SideNavLayout>
            <ProductEditPage />
          </SideNavLayout>
        }
      ></Route>

      <Route
        path="/invoices"
        element={
          <SideNavLayout>
            <InvoicesPage />
          </SideNavLayout>
        }
      ></Route>
      <Route
        path="/invoices/view/:id"
        element={
          <SideNavLayout>
            <InvoiceDetailPage />
          </SideNavLayout>
        }
      />
      <Route
        path="invoices/add"
        element={
          <SideNavLayout>
            <InvoiceAddForm />
          </SideNavLayout>
        }
      />

      <Route
        path="invoices/edit/:id"
        element={
          <SideNavLayout>
            <InvoiceAddForm isEdit={true} />
          </SideNavLayout>
        }
      />

      <Route path="invoices/export/:id" element={<InvoicesExportPage />} />

      <Route
        path="users"
        element={
          <SideNavLayout>
            <UsersPage />
          </SideNavLayout>
        }
      />

      <Route path="test" element={<Testpage />} />
    </Routes>
  );
}

export default App;
