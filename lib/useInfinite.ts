import { Category, Image, Product } from '@prisma/client';
import { useState, useCallback } from 'react';

interface ProductProps {
  initialPage?: number,
  initialProducts: Product[] & {
    images: Image[];
  } & {
    category: Category;
  }
}

const useInfiniteProducts = ({ initialProducts, initialPage = 1 }: ProductProps) => {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [page, setPage] = useState(initialPage);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProducts = useCallback(async () => {
    if (!hasMore) return;

    setIsFetching(true);
    try {
      const response = await fetch(`/api/${initialProducts[0].storeId}/products?page=${page + 1}&isFeatured=true`);
      const newProducts = await response.json();

      if(newProducts.length > 0) {
        if(newProducts.length < 4) {
            setProducts((prevProducts) => [...prevProducts, ...newProducts]);
            setPage((prevPage) => prevPage + 1);
            setHasMore(false);
        } else {
              setProducts((prevProducts) => [...prevProducts, ...newProducts]);
              setPage((prevPage) => prevPage + 1);
        }
      }  else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [hasMore, page]);

  return {
    products,
    loadMoreProducts,
    hasMore,
    isFetching,
  };
};

export default useInfiniteProducts;
