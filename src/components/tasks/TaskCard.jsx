import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "../../redux/features/api/tasksApiSlice";

const TaskCard = ({ task }) => {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const getTaskId = () => {
    return task._id || task.id;
  };

  const handleStatusUpdate = async () => {
    try {
      const taskId = getTaskId();
      if (!taskId) {
        console.error("No task ID found in task object");
        return;
      }

      if (task.status === "pending") {
        await updateTaskStatus({
          id: taskId,
          status: "in-progress",
        }).unwrap();
      } else if (task.status === "in-progress") {
        await updateTaskStatus({
          id: taskId,
          status: "completed",
        }).unwrap();
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const taskId = getTaskId();
      if (!taskId) {
        console.error("No task ID found in task object");
        return;
      }
      await deleteTask(taskId).unwrap();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="bg-secondary/10 rounded-md p-3 md:p-4">
      <div className="flex flex-col gap-2 md:gap-3">
        <h1
          className={`text-base md:text-lg font-semibold ${
            task.priority === "high" ? "text-red-500" : ""
          } ${task.priority === "medium" ? "text-yellow-500" : ""} ${
            task.priority === "low" ? "text-green-500" : ""
          }`}
        >
          {task?.title}
        </h1>
        <p className="text-sm md:text-base text-gray-700">
          {task?.description}
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-xs md:text-sm text-gray-600">
            Assigned to - {task?.assignTo}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs md:text-sm text-gray-600">{task?.deadline}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                title="Delete"
                className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
              >
                <TrashIcon className="h-5 w-5 text-red-500" />
              </button>
              <button
                onClick={handleStatusUpdate}
                title="Update Status"
                className="p-1.5 hover:bg-primary/10 rounded-md transition-colors"
              >
                <ArrowRightIcon className="h-5 w-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
