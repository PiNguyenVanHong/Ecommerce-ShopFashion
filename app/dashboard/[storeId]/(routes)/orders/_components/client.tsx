"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";

import { Heading } from "@/components/ui/heading";
import { OrderColumn, columns } from "@/app/dashboard/[storeId]/(routes)/orders/_components/column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";

interface OrderClientProps {
    storeId: string,
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    storeId, data
}) => {
    const [dataOrder, setDataOrder] = useState(data);

    useEffect(() => {
        pusherClient.subscribe(storeId);
    
        const categoryHandler = (order: any) => {
            setDataOrder((current: any) => {
                    const newOrder = {
                        id: order.id,
                        stt: dataOrder.length + 1,
                        phone: order.phone,
                        address: order.address,
                        products: order.orderItems.map((orderItem: any) => orderItem.product.name).join(', '),
                        totalPrice: formatter.format(order.orderItems.reduce((total: any, order: any) => {
                            return total + Number(order.product.price)
                        }, 0)),
                        isPaid: order.isPaid,
                        createdAt: format(order.createdAt, "MMM do, yyyy")}

                        toast.success("Just have a order by few seconds!!!");
                return [newOrder, ...current];
            });
        }

        const categoryUpdateHandler = (order: any) => {
            setDataOrder((current) => current.map(currentOrder => {
                if(currentOrder.id === order.id) {
                    const newOrder = {
                        id: order.id,
                        stt: currentOrder.stt,
                        phone: order.phone,
                        address: order.address,
                        products: order.orderItems.map((orderItem: any) => orderItem.product.name).join(', '),
                        totalPrice: formatter.format(order.orderItems.reduce((total: any, order: any) => {
                            return total + Number(order.product.price)
                        }, 0)),
                        isPaid: order.isPaid,
                        createdAt: format(order.createdAt, "MMM do, yyyy")}
                    return newOrder;
                }
                return currentOrder;
            }));
        };

        dataOrder.forEach((item, index) => {
            item.stt = index + 1;
        });


        pusherClient.bind('order:new', categoryHandler);
        pusherClient.bind('order:update', categoryUpdateHandler);

        return () => {
            pusherClient.unsubscribe(storeId);
            pusherClient.unbind('order:new', categoryHandler);
            pusherClient.unbind('order:update', categoryUpdateHandler);
        }
}, [data, storeId, setDataOrder]);

    return (
        <>
            <Heading  
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Separator />
            <DataTable searchKey="phone" columns={columns} data={dataOrder} />
        </>
    );
};