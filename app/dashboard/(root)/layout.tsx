import prismadb from "@/lib/prismadb";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    const {userId} = auth();

    if(!userId) {
        redirect('sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    if(store) {
        redirect(`dashboard/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    )
};