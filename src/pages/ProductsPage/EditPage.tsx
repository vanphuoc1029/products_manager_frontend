import { useUpdateProduct, useGetProductById } from "@/apis/ProductsApi";
import AddForm from "./AddForm";
import ProductsHeader from "@/components/ProductsHeader";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (id) {
    const { productData, isLoading: isGetLoading } = useGetProductById(id);
    const {
      updateProductApi,
      isLoading: isEditLoading,
      isError,
      isSuccess,
    } = useUpdateProduct(id);
    return (
      <div style={{ width: "70vw" }} className="space-x-3">
        <ProductsHeader />

        {isGetLoading ? (
          <Skeleton />
        ) : (
          <AddForm
            onSubmit={updateProductApi}
            isLoading={isEditLoading}
            isError={isError}
            isSuccess={isSuccess}
            product={productData}
            handleCancel={() => {
              navigate("/products");
            }}
          />
        )}
      </div>
    );
  }
};
export default EditPage;
