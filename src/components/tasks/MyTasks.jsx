import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useUpdateTaskStatusMutation } from "../../redux/features/api/tasksApiSlice";
import Modal from "../ui/Modal";
import MyTasksSkeleton from "./MyTasksSkeleton";

const MyTasks = ({ tasks, isLoading }) => {
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

  if (isLoading) {
    return <MyTasksSkeleton />;
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
        My Tasks
      </h1>
      <div className="flex-1 h-[calc(100vh-12rem)] overflow-y-auto space-y-2 md:space-y-3 -mx-4 px-4">
        {filteredTasks.map((task) => (
          <div
            key={getTaskId(task)}
            className="bg-secondary/10 rounded-md p-3 flex items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-sm md:text-base font-medium line-clamp-1">
                {task.title}
              </h2>
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                Status: {task.status}
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => handleViewDetails(task)}
                className="p-1.5 hover:bg-primary/10 rounded-md transition-colors"
                title="View Details"
              >
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() => handleCompleteTask(task)}
                className="p-1.5 hover:bg-primary/10 rounded-md transition-colors"
                title="Mark as Complete"
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
            <div>
              <h1 className="text-lg md:text-xl font-semibold mb-1">
                {selectedTask.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                  {selectedTask.status}
                </span>
                <span className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded-md">
                  {selectedTask.assignTo}
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-600">
                {selectedTask.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <p>Due: {selectedTask.deadline}</p>
              <p>
                Created: {new Date(selectedTask.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyTasks;
