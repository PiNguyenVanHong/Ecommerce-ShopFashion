import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { OrderClient } from "@/app/dashboard/[storeId]/(routes)/orders/_components/client";
import { OrderColumn } from "@/app/dashboard/[storeId]/(routes)/orders/_components/column";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item, index) => ({
        id: item.id,
        stt: index + 1,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMM do, yyyy"),
    }));

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient storeId={orders[0].storeId} data={formattedOrders} />
            </div>
        </div>
     );
}
 
export default OrdersPage;