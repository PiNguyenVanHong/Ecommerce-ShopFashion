import prismadb from "@/lib/prismadb";
import { Category } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getCategories = async (): Promise<Category[]> => {
      
    const categories = await prismadb.category.findMany({
        where: {
            storeId: URL,
        },
        include: {
        },
    });

    return categories;
};

export default getCategories;