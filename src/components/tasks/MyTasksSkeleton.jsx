const MyTasksSkeleton = () => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
        My Tasks
      </h1>
      <div className="flex-1 h-[calc(100vh-12rem)] overflow-y-auto space-y-2 md:space-y-3 -mx-4 px-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-secondary/10 rounded-md p-3 flex items-center justify-between gap-3 animate-pulse"
            >
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyTasksSkeleton;
