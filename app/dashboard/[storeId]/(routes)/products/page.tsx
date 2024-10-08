import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter, formatter2 } from "@/lib/utils";

import { ProductClient } from "@/app/dashboard/[storeId]/(routes)/products/_components/client";
import { ProductColumn } from "@/app/dashboard/[storeId]/(routes)/products/_components/column";

const ProductsPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item, index) => ({
        id: item.id,
        stt: index + 1,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter2.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.value,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMM do, yyyy"),
    }));

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
     );
}
 
export default ProductsPage;