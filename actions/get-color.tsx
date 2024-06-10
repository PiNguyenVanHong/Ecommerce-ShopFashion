import prismadb from "@/lib/prismadb";
import { Color } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getColors = async (): Promise<Color[]> => {
    
    
    const colors = await prismadb.color.findMany({
        where: {
            storeId: URL,
        },
        include: {

        },
    });

    return colors;
};

export default getColors;