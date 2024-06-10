import prismadb from "@/lib/prismadb";
import { Category, Color, Image, Product, Size } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getProduct = async (id: string): Promise<Product & { 
    category: Category, 
    images: Image[], 
    size: Size, 
    color: Color 
} | null> => {


    const res = await prismadb.product.findFirst({
        where: {
            storeId: URL,
            id
        },
        include: {
            category: true,
            images: true,
            size: true,
            color: true,
        }
    });
    
    return res;
};

export default getProduct;