import { Suspense } from "react";

import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-color";
import getProducts from "@/actions/get-porducts";
import getSizes from "@/actions/get-sizes";

import Billboard from "@/components/user/billboard";
import Container from "@/components/user/ui/container";
import NoResults from "@/components/user/ui/no-result";
import ProductCard from "@/components/user/ui/product-card";
import Filter from "@/root-routes/category/[categoryId]/_components/filter";
import MobileFilters from "@/root-routes/category/[categoryId]/_components/mobile-filters";
import CategoryContainerPage from "./_components/category-container";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className="bg-background">
      <Container>
        <Suspense>
          <CategoryContainerPage products={products} sizes={sizes} colors={colors} category={category}  />
        </Suspense>
      </Container>
    </div>
  );
};

export default CategoryPage;
