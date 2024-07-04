import { redirect } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = async () => {
    const {userId} = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return ( 
        <div className="border-b bg-card">
            <div className="w-auto flex h-16 items-center px-4 overflow-hidden">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6 overflow-hidden" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;