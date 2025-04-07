const TaskCardSkeleton = () => {
  return (
    <div className="bg-secondary/10 rounded-md p-3 md:p-4 animate-pulse">
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="h-6 md:h-7 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
