import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { formatter2 } from "@/lib/utils";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Autheorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
    req: Request,
    { params }: {params: { storeId: string }}
) {
    const { productIds, url } = await req.json();

    if(!productIds || productIds.length === 0) {
        return new NextResponse("Product ids are required.", { status: 400 });
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds,
            }
        },
        include: {
            images: true,
        }
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
        line_items.push({
            quantity: 1,
            price_data: {
                currency: "VND",
                product_data: {
                    name: product.name,
                    images: [product.images[0].url],
                },
                unit_amount: product.price.toNumber(),
            }
        });
    });

    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                }
            }
        },

    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true
        },
        success_url: `${url}/cart?success=1`,
        cancel_url: `${url}/cart?canceled=1`,
        metadata: {
            orderId: order.id
        }
    });

    await pusherServer.trigger(order.storeId, 'order:new', order);

    return NextResponse.json({ url: session.url }, {
        headers: corsHeaders
    });
}