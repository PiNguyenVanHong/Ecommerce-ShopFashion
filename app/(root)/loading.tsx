import LoadingProduct from "@/components/loading/loading-product";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/user/ui/container";

const Loading = () => {
    return ( 
        <Container>
            <div className="space-y-10 pb-10">
                <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
                    <Skeleton 
                        className="w-full rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden"
                        
                    >
                    </Skeleton>
                </div>
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <LoadingProduct sizes={4} />
                </div>
            </div>
        </Container>
     );
}
 
export default Loading;