import prismadb from "@/lib/prismadb";
import { Billboard } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getBillboard = async (id: string): Promise<Billboard | null> => {
    const res = await prismadb.billboard.findFirst({
        where: {
            storeId: URL,
            id
        }
    });
    
    return res;
};

export default getBillboard;