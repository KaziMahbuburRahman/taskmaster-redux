import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useUpdateTaskStatusMutation } from "../../redux/features/api/tasksApiSlice";
import { removeTask } from "../../redux/features/tasks/tasksSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const handleStatusUpdate = async () => {
    try {
      console.log("Full task object:", task);
      console.log("Current task status:", task.status);
      console.log("Task ID:", task._id || task.id); // Check both possible ID fields

      if (!task._id && !task.id) {
        console.error("No task ID found in task object");
        return;
      }

      const taskId = task._id || task.id;

      if (task.status === "pending") {
        console.log("Updating to in-progress");
        const result = await updateTaskStatus({
          id: taskId,
          status: "in-progress",
        }).unwrap();
        console.log("Update result:", result);
      } else if (task.status === "in-progress") {
        console.log("Updating to completed");
        const result = await updateTaskStatus({
          id: taskId,
          status: "completed",
        }).unwrap();
        console.log("Update result:", result);
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
      console.error("Error details:", error.data);
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
          <button
            onClick={() => dispatch(removeTask(task._id || task.id))}
            title="Delete"
          >
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
