"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            id: 1, 
            href: `/dashboard/${params.storeId}`, 
            label: 'Overview', 
            active: pathname === `/dashboard/${params.storeId}`,
        },
        {
            id: 2, 
            href: `/dashboard/${params.storeId}/billboards`, 
            label: 'Billboards', 
            active: pathname.includes("billboards"),
        },
        {
            id: 3, 
            href: `/dashboard/${params.storeId}/categories`, 
            label: 'Categories', 
            active: pathname.includes("categories"),
        },
        {
            id: 4, 
            href: `/dashboard/${params.storeId}/sizes`, 
            label: 'Sizes', 
            active: pathname.includes("sizes"),
        },
        {
            id: 5, 
            href: `/dashboard/${params.storeId}/colors`, 
            label: 'Colors', 
            active: pathname.includes("colors"),
        },
        {
            id: 6, 
            href: `/dashboard/${params.storeId}/products`, 
            label: 'Products', 
            active: pathname.includes("products"),
        },
        {
            id: 7, 
            href: `/dashboard/${params.storeId}/orders`, 
            label: 'Orders', 
            active: pathname.includes("orders"),
        },
        {
            id: 8, 
            href: `/dashboard/${params.storeId}/settings`, 
            label: 'Settings', 
            active: pathname.includes("settings"),
        },
    ];

    return (
        <nav 
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => (
                    <Link 
                        key={route.id}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-black dark:text-white" : "text-muted-foreground"
                        )}
                    >
                        {route.label}
                    </Link>
            ))}
        </nav>
    )
}