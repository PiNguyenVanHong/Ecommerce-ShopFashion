"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProductProps {
    sizes: number;
}

const LoadingProduct: React.FC<LoadingProductProps> = ({
    sizes
}) => {

    return ( 
        <div className="grid grid-cols-1 mb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(sizes)].map((product, index) => (
                <div key={index} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                    <div className="aspect-square rounded-xl bg-gray-100 relative">
                        <Skeleton className="h-full w-full rounded-xl" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-[150px] mb-2" />
                        <Skeleton className="h-4 w-[80px]" />
                    </div>
                    <div className="mt-3">
                        <Skeleton className="h-4 w-[50px]" />
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default LoadingProduct;