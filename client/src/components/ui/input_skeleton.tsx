import { Skeleton } from "./skeleton";

const InputSkeleton = () => {
  return (
    <div className="mb-4 flex flex-col">
      <Skeleton className="h-[15px] w-[50px] mb-1 rounded-xl" />
      <Skeleton className="h-[30px] w-full rounded-xl" />
    </div>
  );
};

export default InputSkeleton;
