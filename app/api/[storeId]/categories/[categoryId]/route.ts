import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: {params: { categoryId: string }}
) {
    try {
        if(!params.categoryId) {
            return new NextResponse("Category ID is required", {status: 400});
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[BILLBOARD_GET] ', error);
        return new NextResponse("Interal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: {params: { storeId: string, categoryId: string }}
) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const {name, billboardId} = body;

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if(!billboardId) {
            return new NextResponse("Billboard ID required", {status: 400});
        }

        if(!params.categoryId) {
            return new NextResponse("Category ID is required", {status: 400});
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

        const category = await prismadb.category.update({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId
            }
        });
        await pusherServer.trigger(params.storeId, 'categories:update', category);

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_PATCH] ', error);
        return new NextResponse("Interal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: {params: { storeId: string, categoryId: string }}
) {
    try {
        const {userId} = auth();

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!params.categoryId) {
            return new NextResponse("Category ID is required", {status: 400});
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

        const category = await prismadb.category.delete({
            where: {
                id: params.categoryId,
            }
        });

        await pusherServer.trigger(params.storeId, 'categories:delete', category);

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_DELETE] ', error);
        return new NextResponse("Interal error", { status: 500 });
    }
};