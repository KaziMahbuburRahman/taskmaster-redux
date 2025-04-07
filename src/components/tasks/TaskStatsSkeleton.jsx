const TaskStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 animate-pulse"
        >
          <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStatsSkeleton;
