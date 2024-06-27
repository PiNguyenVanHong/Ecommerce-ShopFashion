"use client";

import { useEffect, useState } from "react";
import { Category, Image, Product } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";

import NoResults from "@/components/user/ui/no-result";
import ProductCard from "@/components/user/ui/product-card";
import useInfiniteProducts from "@/lib/useInfinite";
import { Button } from "../ui/button";
import { Spinner } from "./ui/spinner";
import LoadingProduct from "../loading/loading-product";

interface ProductListProps {
  title: string;
  items:
    | (Product[] & {
        images: Image[];
      } & {
        category: Category;
      })
    | any;
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  const { products, loadMoreProducts, hasMore, isFetching } =
  useInfiniteProducts({ initialProducts: items, initialPage: 1 });

  const [data, setData] = useState(products);

  useEffect(() => {
    setData(products);
  }, [products]);

    useEffect(() => {
      pusherClient.subscribe(items[0].storeId);

      const productHandle = (item: any) => {
        setData((current: any) => {
          return [...current, item];
        });
      };

      const productUpdateHandler = (item: any) => {
        setData((current: any[]) =>
          current.map((currentProduct) => {
            if (currentProduct.id === item.id) {
              return item;
            }
            return currentProduct;
          })
        );
      };

      const productDeleteHandler = (item: any) => {
        setData((current: any[]) =>
          current.filter((currentProduct) => {
            if (currentProduct.id !== item.id) {
              return currentProduct;
            }
          })
        );
      };

      pusherClient.bind("product:create", productHandle);
      pusherClient.bind("product:update", productUpdateHandler);
      pusherClient.bind("product:delete", productDeleteHandler);

      return () => {
        pusherClient.unsubscribe(items[0].storeId);
        pusherClient.unbind("product:create", productHandle);
        pusherClient.unbind("product:update", productUpdateHandler);
        pusherClient.unbind("product:delete", productDeleteHandler);
      };
    }, [items[0].storeId]);  

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {data?.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((item: any) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
      {data?.length !== 0 && (
        <div>
          {isFetching ? (
            <LoadingProduct sizes={4} />
          ) : hasMore ? (
            <Button
              className="relative left-1/2 -translate-x-1/2 mb-3"
              onClick={() => loadMoreProducts()}
              disabled={!hasMore || isFetching}
            >
              Load More
            </Button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
