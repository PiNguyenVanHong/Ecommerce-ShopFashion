import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SizesClient } from "@/app/dashboard/[storeId]/(routes)/sizes/_components/client";
import { SizeColumn } from "@/app/dashboard/[storeId]/(routes)/sizes/_components/column";

const SizesPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedSizes: SizeColumn[] = sizes.map((item, index) => ({
        id: item.id,
        stt: index + 1 + "",
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMM do, yyyy"),
    }));

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={formattedSizes} />
            </div>
        </div>
     );
}
 
export default SizesPage;