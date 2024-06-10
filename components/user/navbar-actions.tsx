"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ShoppingBag } from "lucide-react";

import Button from "@/components/user/ui/Button";
import useCart from "@/hooks/use-cart";
import { ThemeToggle } from "@/components/theme-toggle";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if(!isMounted) {
        return null;
    }

    return ( 
        <div className="ml-auto flex items-center gap-x-2">
            <ThemeToggle />
            <Button 
                onClick={() => router.push("/cart")}
                className="flex items-center rounded-full bg-[#333] px-4 py-2"
            >
                <ShoppingBag size={20} color="white" />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
     );
}
 
export default NavbarActions;