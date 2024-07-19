"use client";

import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const [dataRecive, setDateRecive] = useState(data);
  const pathname = usePathname();

  const [active, setActive] = useState(false);

  useEffect(() => {
    pusherClient.subscribe(data[0].storeId);

    const categoryHandler = (category: Category) => {
      setDateRecive((current: any) => {
        return [...current, category];
      });
    };

    const categoryUpdateHandler = (category: Category) => {
      setDateRecive((current) =>
        current.map((currentCategory) => {
          if (currentCategory.id === category.id) {
            return category;
          }
          return currentCategory;
        })
      );
    };

    const categoryDeleteHandler = (category: Category) => {
      setDateRecive((current) =>
        current.filter((currentCategory) => {
          if (currentCategory.id !== category.id) {
            return currentCategory;
          }
        })
      );
    };

    pusherClient.bind("categories:new", categoryHandler);
    pusherClient.bind("categories:update", categoryUpdateHandler);
    pusherClient.bind("categories:delete", categoryDeleteHandler);

    return () => {
      pusherClient.unsubscribe(data[0].storeId);
      pusherClient.unbind("categories:new", categoryHandler);
      pusherClient.unbind("categories:update", categoryUpdateHandler);
      pusherClient.unbind("categories:delete", categoryDeleteHandler);
    };
  }, [data, data[0].storeId]);

  const routes = dataRecive.map((route) => ({
    id: route.id,
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname.includes(`${route.id}`),
  }));

  return (
    <>
      <nav
        key={data[0].storeId}
        className="mx-6 md:flex items-center space-x-4 lg:space-x-6 hidden"
      >
        {routes.map((route) => (
          <Link
            key={route.id}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary text-muted-foreground dark:text-white dark:hover:text-white capitalize",
              route.active
                ? "text-primary hover:text-primary"
                : "text-neutral-500 dark:text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <nav>
        <Button
          className="md:hidden flex flex-col gap-1 relative z-0 ml-2"
          onClick={() => setActive(!active)}
          variant={"outline"}
          size={"icon"}
        >
          <span
            className={cn(
              "bg-[#333] dark:bg-white w-6 h-[2px] rounded-full transition duration-300",
              active ? "rotate-45 translate-y-[3px]" : ""
            )}
          ></span>
          <span
            className={cn(
              "bg-[#333] dark:bg-white w-6 h-[2px] rounded-full transition duration-300",
              active ? "opacity-0 hidden" : "opacity-100"
            )}
          ></span>
          <span
            className={cn(
              "bg-[#333] dark:bg-white w-6 h-[2px] rounded-full transition duration-300",
              active ? "-rotate-45 -translate-y-[3px]" : ""
            )}
          ></span>

          <ul
            className={cn(
              "custom-scrollbar absolute z-10 top-10 left-0 w-56 max-h-44 flex flex-col items-center space-y-2 bg-card p-2 rounded-md transition duration-300",
              active ? "flex opacity-90" : "hidden opacity-0", 
            )}
          >
            <div className={cn("w-full h-full overflow-hidden", 
              routes.length > 4 && "overflow-y-scroll ",
            )}>
            {routes.map((route) => (
              <Link
                key={route.id}
                href={route.href}
                className={cn(
                  "w-full h-8 flex justify-center items-center text-sm font-medium transition-colors hover:text-primary rounded-md text-muted-foreground hover:bg-gray-400/20 dark:text-white dark:hover:text-white capitalize my-2",
                  route.active
                    ? "text-primary hover:text-primary bg-gray-400/20"
                    : "text-neutral-500 dark:text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
            </div>
          </ul>
        </Button>
      </nav>
    </>
  );
};

export default MainNav;