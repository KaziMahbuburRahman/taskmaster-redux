import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useUpdateTaskStatusMutation } from "../../redux/features/api/tasksApiSlice";
import Modal from "../ui/Modal";

const MyTasks = ({ tasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const filteredTasks = tasks.filter((task) => task.assignTo === "Mir Hussain");

  const getTaskId = (task) => {
    return task._id || task.id;
  };

  const handleCompleteTask = async (task) => {
    try {
      const taskId = getTaskId(task);
      if (!taskId) {
        console.error("No task ID found in task object");
        return;
      }
      await updateTaskStatus({ id: taskId, status: "completed" }).unwrap();
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  return (
    <div>
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className="h-[750px] overflow-auto space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={getTaskId(task)}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <h1>{task.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={() => handleViewDetails(task)}
                className="grid place-content-center"
                title="Details"
              >
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() => handleCompleteTask(task)}
                className="grid place-content-center"
                title="Done"
              >
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Task Details">
        {selectedTask && (
          <div className="space-y-4">
            <h1 className="text-xl font-semibold">{selectedTask.title}</h1>
            <p className="text-gray-600">{selectedTask.description}</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                {selectedTask.status}
              </span>
              <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-md">
                {selectedTask.assignTo}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Created: {new Date(selectedTask.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyTasks;
