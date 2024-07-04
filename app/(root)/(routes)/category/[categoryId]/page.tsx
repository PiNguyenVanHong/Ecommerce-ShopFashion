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
          <Billboard data={category?.billboard} />
          <div className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
              <MobileFilters sizes={sizes} colors={colors} />
              <div className="hidden lg:block">
                <Filter valueKey="sizeId" name="sizes" data={sizes} />
                <Filter valueKey="colorId" name="colors" data={colors} />
              </div>
              <div className="mt-6 lg:col-span-4 lg:mt-0">
                {products.length === 0 && <NoResults />}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Suspense>
                    {products.map((item) => (
                      <ProductCard key={item.id} data={item} />
                    ))}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </Container>
    </div>
  );
};

export default CategoryPage;
