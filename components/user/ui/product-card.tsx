"use client";

import { MouseEventHandler, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Expand, ShoppingCart } from "lucide-react";

import { Category, Image as ImageDB, Product } from "@prisma/client";

import { pusherClient } from "@/lib/pusher";
import useCart from "@/hooks/use-cart";
import usePreviewModal from "@/hooks/use-preview-modal";

import IconButton from "@/components/user/ui/icon-button";
import Currency from "@/components/user/ui/currency";
import { Spinner } from "@/components/user/ui/spinner";

interface ProductCardProps {
  data:
    | (Product & {
        images: ImageDB[];
      } & {
        category: Category;
      })
    | any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [dataProduct, setDataProduct] = useState(data);

  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${dataProduct?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(dataProduct);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(dataProduct);
  };

  useEffect(() => {
    pusherClient.subscribe(data.id);

    const productUpdateHandler = (item: any) => {
      setDataProduct((current: any) => {
        if (current.id === item.id) {
          return item;
        }
        return current;
      });
    };

    pusherClient.bind("product:update", productUpdateHandler);

    return () => {
      pusherClient.unsubscribe(data.id);
      pusherClient.unbind("product:update", productUpdateHandler);
    };
  }, [data.id]);

  return (
    <div
      onClick={handleClick}
      className="bg-card group cursor-pointer rounded-xl border p-3 space-y-2 flex flex-col"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100/80 relative">
        <Suspense fallback={<Spinner />}>
          <Image
            src={dataProduct?.images?.[0].url}
            fill
            alt="Image"
            className="aspect-square object-cover rounded-md"
          />
        </Suspense>
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} />}
              className="text-gray-600"
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} />}
              className="text-gray-600"
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="flex-grow">
        <p className="font-semibold text-lg line-clamp-2">{dataProduct.name}</p>
      </div>
      <div className="mt-auto">
        <p className="text-sm text-gray-500 capitalize">
          {dataProduct.category?.name}
        </p>
        <div className="mt-1">
          <Currency value={dataProduct?.price.toString()} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
