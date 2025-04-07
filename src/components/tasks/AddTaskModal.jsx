import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useCreateTaskMutation } from "../../redux/features/api/tasksApiSlice";
import { fetchUsers } from "../../redux/features/tasks/usersSlice";
import Modal from "../ui/Modal";

const AddTaskModal = ({ isOpen, setIsOpen }) => {
  const [createTask] = useCreateTaskMutation();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    console.log("Fetching users...");
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current users state:", { users, isLoading });
  }, [users, isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createTask(data).unwrap();
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Add Task">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("deadline", { required: "Deadline is required" })}
          />
          {errors.deadline && (
            <span className="text-red-500 text-sm">
              {errors.deadline.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assign To
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("assignTo", { required: "Assignee is required" })}
          >
            <option value="">Select assignee</option>
            {isLoading ? (
              <option value="">Loading users...</option>
            ) : (
              users.map((user) => {
                console.log("Rendering user option:", user);
                return (
                  <option key={user.id} value={user.displayName}>
                    {user.displayName}
                  </option>
                );
              })
            )}
          </select>
          {errors.assignTo && (
            <span className="text-red-500 text-sm">
              {errors.assignTo.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("priority", { required: "Priority is required" })}
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <span className="text-red-500 text-sm">
              {errors.priority.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("status", { required: "Status is required" })}
            defaultValue="pending"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm">
              {errors.status.message}
            </span>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
