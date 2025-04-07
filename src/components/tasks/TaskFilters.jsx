import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setFilters,
  setSortBy,
  setSortOrder,
} from "../../redux/features/tasks/tasksSlice";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { filters, sortBy, sortOrder } = useSelector((state) => state.tasks);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleSortChange = (key) => {
    if (key === sortBy) {
      dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
    } else {
      dispatch(setSortBy(key));
      dispatch(setSortOrder("asc"));
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm mb-4 md:mb-6">
      <div className="flex flex-col gap-3 md:gap-4">
        {/* Search */}
        <div className="relative w-full">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
          />
        </div>

        {/* Filters Container */}
        <div className="grid grid-cols-2 gap-2 w-full">
          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="px-3 md:px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="px-3 md:px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            onClick={() => handleSortChange("createdAt")}
            className={`px-3 md:px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base ${
              sortBy === "createdAt"
                ? "bg-primary text-white border-primary"
                : "border-gray-300"
            }`}
          >
            Date {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => handleSortChange("priority")}
            className={`px-3 md:px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base ${
              sortBy === "priority"
                ? "bg-primary text-white border-primary"
                : "border-gray-300"
            }`}
          >
            Priority{" "}
            {sortBy === "priority" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>

        {/* Clear Filters */}
        {(filters.status !== "all" ||
          filters.priority !== "all" ||
          filters.search) && (
          <button
            onClick={handleClearFilters}
            className="w-full px-3 md:px-4 py-2.5 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;
