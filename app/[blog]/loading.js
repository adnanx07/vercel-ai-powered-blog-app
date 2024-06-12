import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      <Skeleton height={24} count={1.7} className="mb-1" />
      <Skeleton height={15} count={1.5} className="mb-1 mt-2" />

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold mb-4">
          <Skeleton width={100} height={27} />
        </h3>
        <div className="divide-y">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start py-4">
              <Skeleton circle={true} height={48} width={48} />
              <div className="ml-4 w-full">
                <div className="flex items-center mb-1">
                  <Skeleton width={200} height={20} />
                </div>
                <Skeleton count={1.6} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
