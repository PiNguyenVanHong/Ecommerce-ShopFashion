import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: {params: { productId: string }}
) {
    try {
        if(!params.productId) {
            return new NextResponse("Product ID is required", {status: 400});
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_GET] ', error);
        return new NextResponse("Interal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: {params: { storeId: string, productId: string }}
) {
    try {
        const {userId} = auth();
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
            return new NextResponse("Store id is required", {status: 400});
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

        // update all information without images
        await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    deleteMany: {}
                },
                isFeatured,
                isArchived,
            }
        });

        // only update images base on productId params
        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((img: {url: string}) => img),
                        ]
                    }
                }
            },
            include: {
                images: true,
                color: true,
                size: true,
                category: true,
            }
        });

        await pusherServer.trigger(params.storeId, 'product:update', product);
        await pusherServer.trigger(params.productId, 'product:update', product);

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_PATCH] ', error);
        return new NextResponse("Interal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: {params: { storeId: string, productId: string }}
) {
    try {
        const {userId} = auth();

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!params.productId) {
            return new NextResponse("Product ID is required", {status: 400});
        }

        const storeUserById = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if(!storeUserById) {
            return new NextResponse("Unauthorized", {status: 403});
        }

        const product = await prismadb.product.delete({
            where: {
                id: params.productId,
            }
        });

        await pusherServer.trigger(params.storeId, 'product:delete', product);

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_DELETE] ', error);
        return new NextResponse("Interal error", { status: 500 });
    }
};