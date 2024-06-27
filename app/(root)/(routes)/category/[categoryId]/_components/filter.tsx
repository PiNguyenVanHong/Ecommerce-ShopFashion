"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

import { cn } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { Color, Size } from "@prisma/client";

import Button from "@/components/user/ui/Button";

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
}

const Filter: React.FC<FilterProps> = ({
    data, name, valueKey,
}) => {
    const [dataFilter, setDataFilter] = useState(data);

    useEffect(() => {
        pusherClient.subscribe(data[0].storeId);
        
        const filterHandle = (filter: Size | Color) => {
            setDataFilter((current: any) => {
                console.log(filter);
                
                return [...current, filter];
            });
        }

        const filterUpdateHandler = (filter: Size | Color) => {
            setDataFilter((current) => current.map(currentFilter => {
                if(currentFilter.id === filter.id) {
                    return filter;
                }
                return currentFilter;
            }));
        };


        const filterDeleteHandler = (filter: Size | Color) => {
            setDataFilter((current) => current.filter(currentFilter => {
                if(currentFilter.id !== filter.id) {
                    return currentFilter;
                }
            }));
        }


        pusherClient.bind(`${name}:create`, filterHandle);
        pusherClient.bind(`${name}:update`, filterUpdateHandler);
        pusherClient.bind(`${name}:delete`, filterDeleteHandler);

        return () => {
            pusherClient.unsubscribe(data[0].storeId);
            pusherClient.unbind(`${name}:create`, filterHandle);
            pusherClient.unbind(`${name}:update`, filterUpdateHandler);
            pusherClient.unbind(`${name}:delete`, filterDeleteHandler);
        }
    }, [data[0].storeId]);

    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        
        const query = {
            ...current,
            [valueKey]: id
        }

        // Xét điều kiện, nếu có id trên url rồi, thì cho nó về null,
        // để không có selected cái thẻ đó
        if(current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true });

        router.push(url);
    }

    return ( 
        <div className="mb-8">
            <h3 className="text-lg font-semibold capitalize">
                {name}
            </h3>
            <hr className="my-4" />
            <h3 className="flex flex-wrap gap-2">
                {dataFilter.map((filter) => (
                    <div 
                        key={filter.id}
                        className="flex items-center cursor-pointer"
                    >
                        <Button
                            className={cn(
                                "rounded-md text-sm text-card-foreground bg-background p-2  dark:bg-card/60 border border-gray-300 dark:border-[#575757] capitalize",
                                selectedValue === filter.id && "bg-black dark:bg-[#3A3A3A] dark:border-gray-400 text-white"
                            )}
                            onClick={() => onClick(filter.id)}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </h3>
        </div>
     );
}
 
export default Filter;