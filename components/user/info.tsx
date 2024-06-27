"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { Color, Image, Product, Size } from "@prisma/client";
import useCart from "@/hooks/use-cart";
import { pusherClient } from "@/lib/pusher";

import Currency from "@/components/user/ui/currency";
import Button from "@/components/user/ui/Button";

interface InfoProps {
    data: Product & {
        size: Size,
        color: Color,
        images: Image[],
    } | null | any;
}

const Info: React.FC<InfoProps> = ({
    data,
}) => {
    const [dataProduct, setDataProduct] = useState(data);
    const cart = useCart();

    const onAddToCart = () => {
        cart.addItem(dataProduct);
    }

    useEffect(() => {
        pusherClient.subscribe(data.id);

        const productUpdateHandler = (item: any) => {
            setDataProduct((current: any) =>  {
                if(current.id === item.id) {
                    return item;
                }
                return current;
            });
        };

        pusherClient.bind('product:update', productUpdateHandler);

        return () => {
            pusherClient.unsubscribe(data.id);
            pusherClient.unbind('product:update', productUpdateHandler);
        }
    }, [data.id]);

    return ( 
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{dataProduct?.name}</h1>
            <div className="mt-3 flex items-center justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={dataProduct?.price.toString()} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div className="text-[#333]">{dataProduct?.size?.name}</div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div 
                        className="h-6 w-6 rounded-full border border-gray-600"
                        style={{ backgroundColor: dataProduct?.color?.value}}
                    />
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="flex items-center gap-x-2">
                    Add To Cart
                    <ShoppingCart />
                </Button>
            </div>
        </div>
     );
}
 
export default Info;