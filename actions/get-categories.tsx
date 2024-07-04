import prismadb from "@/lib/prismadb";
import { Category } from "@prisma/client";
import { boolean } from "zod";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getCategories = async (orderBy?: boolean): Promise<Category[]> => {
      
    const categories = await prismadb.category.findMany({
        where: {
            storeId: URL,
        },
        orderBy: {
            createdAt: orderBy ? "asc" : "desc",
        },
    });

    return categories;
};

export default getCategories;