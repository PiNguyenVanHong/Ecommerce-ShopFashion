"use client";

import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface MainNavProps {
    data: Category[],
}

const MainNav: React.FC<MainNavProps> = ({
    data
}) => {
    const [dataRecive, setDateRecive] = useState(data);
    const pathname = usePathname();

    useEffect(() => {
            pusherClient.subscribe(data[0].storeId);
        
            const categoryHandler = (category: Category) => {
                setDateRecive((current: any) => {

                    return [...current, category];
                });
            }

            const categoryUpdateHandler = (category: Category) => {
                setDateRecive((current) => current.map(currentCategory => {
                    if(currentCategory.id === category.id) {
                        return category;
                    }
                    return currentCategory;
                }));
            };


            const categoryDeleteHandler = (category: Category) => {
                setDateRecive((current) => current.filter(currentCategory => {
                    if(currentCategory.id !== category.id) {
                        return currentCategory;
                    }
                }));
            }


            pusherClient.bind('categories:new', categoryHandler);
            pusherClient.bind('categories:update', categoryUpdateHandler);
            pusherClient.bind('categories:delete', categoryDeleteHandler);

            return () => {
                pusherClient.unsubscribe(data[0].storeId);
                pusherClient.unbind('categories:new', categoryHandler);
                pusherClient.unbind('categories:update', categoryUpdateHandler);
                pusherClient.unbind('categories:delete', categoryDeleteHandler);
            }
    }, [data, data[0].storeId]);

    const routes = dataRecive.map((route) => ({
        id: route.id,
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname.includes(`${route.id}`),
    }));

    return ( 
        <nav key={data[0].storeId}
            className="mx-6 flex items-center space-x-4 lg:space-x-6"
        >
            {routes.map((route) => (
                <Link
                    key={route.id}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary text-muted-foreground dark:text-white dark:hover:text-white capitalize",
                        route.active ? "text-primary hover:text-primary" : "text-neutral-500 dark:text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav> 
    );
}
 
export default MainNav;