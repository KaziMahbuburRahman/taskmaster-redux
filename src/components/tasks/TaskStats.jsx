import {
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectTaskStats } from "../../redux/features/tasks/tasksSlice";

const TaskStats = () => {
  const stats = useSelector(selectTaskStats);

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ChartBarIcon,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: ClockIcon,
      color: "bg-yellow-500",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircleIcon,
      color: "bg-green-500",
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: ExclamationCircleIcon,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4"
        >
          <div className={`${stat.color} p-3 rounded-lg`}>
            <stat.icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
