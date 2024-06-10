"use client";

import { Color, Size } from "@prisma/client";

import qs from "query-string";

import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/user/ui/Button";
import { cn } from "@/lib/utils";

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
}

const Filter: React.FC<FilterProps> = ({
    data, name, valueKey,
}) => {
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
            <h3 className="text-lg font-semibold">
                {name}
            </h3>
            <hr className="my-4" />
            <h3 className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div 
                        key={filter.id}
                        className="flex items-center"
                    >
                        <Button
                            className={cn(
                                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                                selectedValue === filter.id && "bg-black text-white"
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