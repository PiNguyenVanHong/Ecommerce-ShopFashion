import prismadb from "@/lib/prismadb";
import { Billboard, Category } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getCategory = async (id: string): Promise<Category & { billboard: Billboard } | null> => {


    const res = await prismadb.category.findFirst({
        where: {
            storeId: URL,
            id
        },
        include: {
            billboard: true,
        }
    });
    
    return res;
};

export default getCategory;