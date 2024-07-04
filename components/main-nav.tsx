"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const [active, setActive] = useState(false);

  const routes = [
    {
      id: 1,
      href: `/dashboard/${params.storeId}`,
      label: "Overview",
      active: pathname === `/dashboard/${params.storeId}`,
    },
    {
      id: 2,
      href: `/dashboard/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname.includes("billboards"),
    },
    {
      id: 3,
      href: `/dashboard/${params.storeId}/categories`,
      label: "Categories",
      active: pathname.includes("categories"),
    },
    {
      id: 4,
      href: `/dashboard/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname.includes("sizes"),
    },
    {
      id: 5,
      href: `/dashboard/${params.storeId}/colors`,
      label: "Colors",
      active: pathname.includes("colors"),
    },
    {
      id: 6,
      href: `/dashboard/${params.storeId}/products`,
      label: "Products",
      active: pathname.includes("products"),
    },
    {
      id: 7,
      href: `/dashboard/${params.storeId}/orders`,
      label: "Orders",
      active: pathname.includes("orders"),
    },
    {
      id: 8,
      href: `/dashboard/${params.storeId}/settings`,
      label: "Settings",
      active: pathname.includes("settings"),
    },
  ];

  return (
    <div className="flex items-center gap-5 w-full">
      <nav
        className={cn(
          "lg:flex lg:gap-0 lg:translate-y-0 items-center space-x-4 lg:space-x-9 transition duration-300 md:grid md:grid-cols-4 md:justify-items-center md:w-full md:gap-6 sm:grid sm:grid-cols-4 sm:justify-items-center sm:w-full sm:gap-6",
          active
            ? "sm:-translate-y-1/3 md:-translate-y-1/3"
            : "sm:translate-y-1/3 md:translate-y-1/3",
          className
        )}
      >
        {routes.map((route) => (
          <Link
            key={route.id}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="hidden lg:hidden md:flex md:flex-row sm:flex sm:flex-col mr-3 gap-2 my-2">
        <Button
          className={cn(
            "rounded-lg w-10 sm:px-0 sm:h-6 md:px-2 md:h-9 cursor-pointer",
            !active && "cursor-not-allowed"
          )}
          size={"sm"}
          variant={"secondary"}
          disabled={!active}
          onClick={() => setActive(false)}
        >
          <ChevronLeft className="sm:rotate-90 md:rotate-0" size={16} />
        </Button>
        <Button
          className={cn(
            "rounded-lg w-10 sm:px-0 sm:h-6 md:px-2 md:h-9 cursor-pointer",
            active && "cursor-not-allowed"
          )}
          size={"sm"}
          variant={"secondary"}
          disabled={active}
          onClick={() => setActive(true)}
        >
          <ChevronRight className="sm:rotate-90 md:rotate-0" size={16} />
        </Button>
      </div>
    </div>
  );
}
