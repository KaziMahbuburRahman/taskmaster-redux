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
    <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3  ${
          task.priority === "high" ? "text-red-500" : ""
        } ${task.priority === "medium" ? "text-yellow-500" : ""} ${
          task.priority === "low" ? "text-green-500" : ""
        }`}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.deadline}</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} title="Delete">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
          <button onClick={handleStatusUpdate} title="In progress">
            <ArrowRightIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
