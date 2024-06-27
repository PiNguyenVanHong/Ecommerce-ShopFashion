import prismadb from "@/lib/prismadb";
import { Category, Image, Product } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
};

const getProducts = async (query: Query): Promise<Product & { 
    images: Image, category: Category 
}[] | any[]> => {
    
    try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const products = await prismadb.product.findMany({
            where: {
                storeId: URL,
                colorId: query.colorId,
                sizeId: query.sizeId,
                categoryId: query.categoryId,
                isFeatured: query.isFeatured,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 4,
        });
    
        return products;
    } catch (error) {
        return [];
    }
};

export default getProducts;