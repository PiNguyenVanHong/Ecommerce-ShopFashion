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

  [
    {
      "id": "f1814ae3-d94f-48d1-bc12-811c2db5442a",
      "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
      "categoryId": "e1c14b0c-a9a5-4de7-8474-b2aeca03a4fe",
      "sizeId": "baacb109-7958-4b08-95fd-af5a2fdb1df3",
      "colorId": "bd69b30e-705c-4a2e-b161-0b0b42b1ebf3",
      "name": "Men's Sports Shorts 5\" 7799",
      "price": "127000",
      "isFeatured": false,
      "isArchived": false,
      "createdAt": "2024-06-16T06:52:34.968Z",
      "updatedAt": "2024-06-16T06:52:34.968Z",
      "images": [
        {
          "id": "a1fd895e-cc0d-47db-bbbb-d3d01cedc91a",
          "productId": "f1814ae3-d94f-48d1-bc12-811c2db5442a",
          "url": "https://res.cloudinary.com/dkzhps0yd/image/upload/v1718520662/y5p6rs7otnbrmvrjoasq.png",
          "createdAt": "2024-06-16T06:52:34.968Z",
          "updatedAt": "2024-06-16T06:52:34.968Z"
        },
        {
          "id": "2f5e9e63-9b22-46c9-88c4-58c9f22f7feb",
          "productId": "f1814ae3-d94f-48d1-bc12-811c2db5442a",
          "url": "https://res.cloudinary.com/dkzhps0yd/image/upload/v1718520662/mcfnu61yjdsfikasobvs.png",
          "createdAt": "2024-06-16T06:52:34.968Z",
          "updatedAt": "2024-06-16T06:52:34.968Z"
        }
      ],
      "category": {
        "id": "e1c14b0c-a9a5-4de7-8474-b2aeca03a4fe",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "billboardId": "e2b7a2b1-490c-4ab6-8906-07fa698cef25",
        "name": "sports shorts",
        "createdAt": "2024-06-09T12:23:41.615Z",
        "updatedAt": "2024-06-09T12:23:41.615Z"
      },
      "color": {
        "id": "bd69b30e-705c-4a2e-b161-0b0b42b1ebf3",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "name": "Gray",
        "value": "#CCCAC9",
        "createdAt": "2024-06-16T06:42:46.762Z",
        "updatedAt": "2024-06-16T06:42:46.762Z"
      },
      "size": {
        "id": "baacb109-7958-4b08-95fd-af5a2fdb1df3",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "name": "Medium",
        "value": "M",
        "createdAt": "2024-06-09T12:24:34.009Z",
        "updatedAt": "2024-06-09T12:26:00.317Z"
      }
    },
    {
      "id": "b95d2f34-af81-4d4d-bd4b-37d695f16249",
      "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
      "categoryId": "c3ca874e-c81b-45f0-8b00-db8cd3e3e668",
      "sizeId": "3283c00b-5dbc-489b-b835-f6c0115ea095",
      "colorId": "26094a41-05c4-420e-86a3-d83f9137bc72",
      "name": "Gym Powerfit T-shirt",
      "price": "239000",
      "isFeatured": true,
      "isArchived": false,
      "createdAt": "2024-06-16T06:50:44.429Z",
      "updatedAt": "2024-06-16T06:50:44.429Z",
      "images": [
        {
          "id": "db47b248-9773-4ca6-8e43-b33a0fb3fa59",
          "productId": "b95d2f34-af81-4d4d-bd4b-37d695f16249",
          "url": "https://res.cloudinary.com/dkzhps0yd/image/upload/v1718520599/rvrhr3fowzej7jtbna7n.png",
          "createdAt": "2024-06-16T06:50:44.429Z",
          "updatedAt": "2024-06-16T06:50:44.429Z"
        },
        {
          "id": "15c4bc54-1a29-4410-b20c-b211e62e4fb9",
          "productId": "b95d2f34-af81-4d4d-bd4b-37d695f16249",
          "url": "https://res.cloudinary.com/dkzhps0yd/image/upload/v1718520599/j3t2ogxvnyiagys6wpwf.png",
          "createdAt": "2024-06-16T06:50:44.429Z",
          "updatedAt": "2024-06-16T06:50:44.429Z"
        }
      ],
      "category": {
        "id": "c3ca874e-c81b-45f0-8b00-db8cd3e3e668",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "billboardId": "7de39f3c-6979-4ba3-9e63-8034198ec511",
        "name": "T-Shirt",
        "createdAt": "2024-06-10T10:05:27.299Z",
        "updatedAt": "2024-06-13T07:17:19.662Z"
      },
      "color": {
        "id": "26094a41-05c4-420e-86a3-d83f9137bc72",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "name": "Black",
        "value": "#000000",
        "createdAt": "2024-06-09T12:26:24.593Z",
        "updatedAt": "2024-06-09T12:26:24.593Z"
      },
      "size": {
        "id": "3283c00b-5dbc-489b-b835-f6c0115ea095",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "name": "Large",
        "value": "L",
        "createdAt": "2024-06-09T12:25:54.022Z",
        "updatedAt": "2024-06-09T12:25:54.022Z"
      }
    },
    {
      "id": "c64444e9-5b8d-41b5-85b6-1c825de6c051",
      "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
      "categoryId": "c3ca874e-c81b-45f0-8b00-db8cd3e3e668",
      "sizeId": "baacb109-7958-4b08-95fd-af5a2fdb1df3",
      "colorId": "65549722-437b-4856-9070-64dd58a486c4",
      "name": " Graphic Jungle Running T-Shirt",
      "price": "189000",
      "isFeatured": true,
      "isArchived": false,
      "createdAt": "2024-06-16T06:49:53.078Z",
      "updatedAt": "2024-06-16T06:49:53.078Z",
      "images": [
        {
          "id": "13574468-ee69-4fc1-9bef-69e2cf1cd30f",
          "productId": "c64444e9-5b8d-41b5-85b6-1c825de6c051",
          "url": "https://res.cloudinary.com/dkzhps0yd/image/upload/v1718520548/faseb94fo2v7qmrfc6bh.png",
          "createdAt": "2024-06-16T06:49:53.078Z",
          "updatedAt": "2024-06-16T06:49:53.078Z"
        },
        {
          "id": "77629230-7766-4779-bca3-7c34736021f7",
          "productId": "c64444e9-5b8d-41b5-85b6-1c825de6c051",
          "url": "https://res.cloudinary.com/dkzhps0yd/image/upload/v1718520548/scbpiu9y90qm3npizwrv.png",
          "createdAt": "2024-06-16T06:49:53.078Z",
          "updatedAt": "2024-06-16T06:49:53.078Z"
        }
      ],
      "category": {
        "id": "c3ca874e-c81b-45f0-8b00-db8cd3e3e668",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "billboardId": "7de39f3c-6979-4ba3-9e63-8034198ec511",
        "name": "T-Shirt",
        "createdAt": "2024-06-10T10:05:27.299Z",
        "updatedAt": "2024-06-13T07:17:19.662Z"
      },
      "color": {
        "id": "65549722-437b-4856-9070-64dd58a486c4",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "name": "Liver (Organ)",
        "value": "#692C29",
        "createdAt": "2024-06-16T06:36:56.042Z",
        "updatedAt": "2024-06-16T06:36:56.042Z"
      },
      "size": {
        "id": "baacb109-7958-4b08-95fd-af5a2fdb1df3",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "name": "Medium",
        "value": "M",
        "createdAt": "2024-06-09T12:24:34.009Z",
        "updatedAt": "2024-06-09T12:26:00.317Z"
      }
    },
    {
      "id": "89bdd064-3085-4303-9d59-8127eb3cb68f",
      "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
      "categoryId": "c3ca874e-c81b-45f0-8b00-db8cd3e3e668",
      "sizeId": "baacb109-7958-4b08-95fd-af5a2fdb1df3",
      "colorId": "f4145235-3ba4-4e29-b3e3-401d8a537289",
      "name": "Graphic Heartbeat Running T-Shirt",
      "price": "149000",
      "isFeatured": true,
      "isArchived": false,
      "createdAt": "2024-06-13T09:04:12.510Z",
      "updatedAt": "2024-06-16T06:48:54.220Z",
      "images": [
        {
          "id": "b6f7c1e9-a79e-474d-8895-07ea1459062d",
          "productId": "89bdd064-3085-4303-9d59-8127eb3cb68f",
          "url": "https://res.cloudinary.com/dkzhps0yd/image/upload/v1718520440/bqzhmdlcujr9zpbburhm.png",
          "createdAt": "2024-06-16T06:48:54.685Z",
          "updatedAt": "2024-06-16T06:48:54.685Z"
        },
        {
          "id": "ea8f8c8f-2d68-49c2-9b03-81d8a3342d74",
          "productId": "89bdd064-3085-4303-9d59-8127eb3cb68f",
          "url": "https://res.cloudinary.com/dkzhps0yd/image/upload/v1718520440/wzdhewkjccugurrejstf.png",
          "createdAt": "2024-06-16T06:48:54.685Z",
          "updatedAt": "2024-06-16T06:48:54.685Z"
        }
      ],
      "category": {
        "id": "c3ca874e-c81b-45f0-8b00-db8cd3e3e668",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "billboardId": "7de39f3c-6979-4ba3-9e63-8034198ec511",
        "name": "T-Shirt",
        "createdAt": "2024-06-10T10:05:27.299Z",
        "updatedAt": "2024-06-13T07:17:19.662Z"
      },
      "color": {
        "id": "f4145235-3ba4-4e29-b3e3-401d8a537289",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "name": "Other",
        "value": "#FFFFFF",
        "createdAt": "2024-06-16T06:43:42.744Z",
        "updatedAt": "2024-06-16T06:43:42.744Z"
      },
      "size": {
        "id": "baacb109-7958-4b08-95fd-af5a2fdb1df3",
        "storeId": "c913c24f-5030-4c66-9046-07916311d3d6",
        "name": "Medium",
        "value": "M",
        "createdAt": "2024-06-09T12:24:34.009Z",
        "updatedAt": "2024-06-09T12:26:00.317Z"
      }
    }
  ]

  return {
    products,
    loadMoreProducts,
    hasMore,
    isFetching,
  };
};

export default useInfiniteProducts;
