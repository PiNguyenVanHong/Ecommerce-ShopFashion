import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ColorsClient } from "@/app/dashboard/[storeId]/(routes)/colors/_components/client";
import { ColorColumn } from "@/app/dashboard/[storeId]/(routes)/colors/_components/column";

const ColorsPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedColors: ColorColumn[] = colors.map((item, index) => ({
        id: item.id,
        stt: index + 1,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMM do, yyyy"),
    }));

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data={formattedColors} />
            </div>
        </div>
     );
}
 
export default ColorsPage;