import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { pusherServer } from "@/lib/pusher";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        console.log(error);
        return new NextResponse(`WEBHOOK ERROR: ${error}.`, { status: 400});
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;
    
    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ]

    const addressString = addressComponents.filter((c) => c !== null).join(', ');

    if(event.type === "checkout.session.completed") {
        const order = await prismadb.order.update({
            where: {
                id: session?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || ''
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    }
                }
            },
        });

        const productIds = order.orderItems.map((orderItem) => orderItem.productId);

        await prismadb.product.updateMany({
            where: {
                id: {
                    in: [...productIds]
                }
            },
            data: {
                isArchived: true,
            }
        });

        await pusherServer.trigger(order.storeId, 'order:update', order);
    }

    return new NextResponse(null, { status: 200 });
}