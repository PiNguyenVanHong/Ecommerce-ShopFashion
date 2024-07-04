import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-10 pb-10 w-full">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex justify-between rounded-md border border-gray-400 p-4">
            <div className="flex flex-col gap-3">
              <div>
                  <Skeleton className="h-10 w-64"></Skeleton>
              </div>
                <div>
                  <Skeleton className="h-4 w-28"></Skeleton>
                </div>
            </div>
            <div>
              <div>
                <Skeleton className="h-10 w-20 rounded-md"></Skeleton>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col mt-4">
            <div className="mt-5 rounded-md border border-gray-400 p-5">
            <div className="mb-3">
                <div className="rounded-md border border-gray-400 p-3 max-w-sm">
                <Skeleton className="max-w-sm h-11" />
                </div>
            </div>
              <Skeleton className="rounded-md w-full h-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
