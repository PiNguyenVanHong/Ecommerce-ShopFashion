"use client";

import Billboard from "@/components/user/billboard";
import MobileFilters from "@/root-routes/category/[categoryId]/_components/mobile-filters";
import Filter from "@/root-routes/category/[categoryId]/_components/filter";
import NoResults from "@/components/user/ui/no-result";
import { ReactNode, Suspense, useEffect, useState } from "react";
import ProductCard from "@/components/user/ui/product-card";
import {
  Billboard as BillboardType,
  Category,
  Color,
  Image,
  Product,
  Size,
} from "@prisma/client";
import { pusherClient } from "@/lib/pusher";

interface CategoryContainerPageProps {
  products:
     (Product &
        {
          images: Image;
          category: Category;
        }[])
    | any[];
  category: (Category & { billboard: BillboardType }) | null;
  sizes: Size[];
  colors: Color[];
}

const CategoryContainerPage: React.FC<CategoryContainerPageProps> = ({
  category,
  sizes,
  colors,
  products,
}) => {
  const [data, setData] = useState(category?.billboard);
  const [dataProducts, setDataProducts] = useState(products);

  useEffect(() => {
   setDataProducts(products);
    
  }, [products]);

  useEffect(() => {
    pusherClient.subscribe(category?.storeId!);

    const categoryUpdateHandler = (
      category: Category & { billboard: BillboardType }
    ) => {
      setData(category.billboard);
    };

    const addProductHandler = (product: any) => {
      let isAdd = false;
      dataProducts.filter((dataProduct: any) => {
        if(category?.id === product.categoryId) {
          isAdd = true;
          return;
        }
      });

        if(isAdd) {
          setDataProducts([...dataProducts, product]);
        }
    };

    const deleteProductHandler = (product: any) => {
      setDataProducts((current: any[]) =>
        current.filter((currentProduct: any) => {
          if (currentProduct.id !== product.id) {
            
            return currentProduct;
          }
        })
      );
    };

    pusherClient.bind("categories:update", categoryUpdateHandler);
    pusherClient.bind("product:create", addProductHandler);
    pusherClient.bind("product:delete", deleteProductHandler);

    return () => {
      pusherClient.unsubscribe(category?.billboardId!);
      pusherClient.bind("categories:update", categoryUpdateHandler);
      pusherClient.bind("product:create", addProductHandler);
      pusherClient.unbind("product:delete", deleteProductHandler);
    };
  }, [category?.storeId]);

  return (
    <>
      <Billboard data={data} />
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters sizes={sizes} colors={colors} />
          <div className="hidden lg:block">
            <Filter valueKey="sizeId" name="sizes" data={sizes} />
            <Filter valueKey="colorId" name="colors" data={colors} />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {dataProducts.length === 0 && <NoResults />}
            {dataProducts.length !== 0 && <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dataProducts?.map((item: any) => (
                  <ProductCard key={item.id} data={item} />
                ))}
            </div>
            </>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryContainerPage;
