import { useUpdateCategory, useGetCategoryById } from "@/apis/CategoriesApi";
import AddForm from "./AddForm";
import ProductsHeader from "@/components/ProductsHeader";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (id) {
    const { categoryData, isLoading: isGetLoading } = useGetCategoryById(id);
    const {
      editCategoryApi,
      isLoading: isEditLoading,
      isError,
      isSuccess,
    } = useUpdateCategory(id);
    return (
      <div style={{ width: "70vw" }} className="space-x-3">
        <ProductsHeader />

        {isGetLoading ? (
          <Skeleton />
        ) : (
          <AddForm
            onSubmit={editCategoryApi}
            isLoading={isEditLoading}
            isError={isError}
            isSuccess={isSuccess}
            category={categoryData}
            handleCancel={() => {
              navigate("/categories");
            }}
          />
        )}
      </div>
    );
  }
};
export default EditPage;
