import prismadb from "@/lib/prismadb";
import { Size } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getSizes = async (): Promise<Size[]> => {
    
    
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: URL,
        },
        include: {

        },
    });

    return sizes;
};

export default getSizes;