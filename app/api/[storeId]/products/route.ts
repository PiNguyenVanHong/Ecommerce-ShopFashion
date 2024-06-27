import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params} : {params: {storeId: string}}
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const page = Number(searchParams.get("page") || 1);
        const isFeatured = searchParams.get("isFeatured");

        if(!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400});
        }

        const products = await prismadb.product.findMany({
            where: {
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
                storeId: params.storeId,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip: (page - 1) * 4,
            take: 4,
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log('[PRODUCTS_GET] ', error);
        return new NextResponse("Interal error", { status: 500 });
    }   
}

export async function POST(
    req: Request,
    {params} : {params: {storeId: string}}
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,
        } = body;

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!name) {
            return new NextResponse("Name product is required", {status: 400});
        }

        if(!price) {
            return new NextResponse("Price product is required", {status: 400});
        }

        if(!images || !images.length) {
            return new NextResponse("Images are required", {status: 400});
        }

        if(!categoryId) {
            return new NextResponse("Choose a category", {status: 400});
        }

        if(!colorId) {
            return new NextResponse("Choose a color", {status: 400});
        }

        if(!sizeId) {
            return new NextResponse("Choose a size", {status: 400});
        }

        if(!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });
        
        if(!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403});
        }

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colorId,
                sizeId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((img: { url: string }) => img)
                        ]
                    }
                }
            }
        });

        await pusherServer.trigger(params.storeId, 'product:create', product);

        return NextResponse.json(product);

    } catch (error) {
        console.log('PRODUCT_POST] ', error);
        return new NextResponse("Interal error", { status: 500 });
    }   
}