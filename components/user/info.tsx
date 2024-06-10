"use client";

import { Color, Image, Product, Size } from "@prisma/client";

import { ShoppingCart } from "lucide-react";

import Currency from "@/components/user/ui/currency";
import Button from "@/components/user/ui/Button";

interface InfoProps {
    data: Product & {
        size: Size,
        color: Color,
        images: Image[],
    } | null;
}

const Info: React.FC<InfoProps> = ({
    data,
}) => {
    return ( 
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data?.name}</h1>
            <div className="mt-3 flex items-center justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price.toString()} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>{data?.size.name}</div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div 
                        className="h-6 w-6 rounded-full border border-gray-600"
                        style={{ backgroundColor: data?.color.value}}
                    />
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button className="flex items-center gap-x-2">
                    Add To Cart
                    <ShoppingCart />
                </Button>
            </div>
        </div>
     );
}
 
export default Info;