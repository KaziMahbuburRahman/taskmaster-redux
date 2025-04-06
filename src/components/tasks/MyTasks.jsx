import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../redux/features/tasks/tasksSlice";
import Modal from "../ui/Modal";

const MyTasks = ({ tasks }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const filteredTasks = tasks.filter((task) => task.assignTo === "Mir Hussain");
  console.log(filteredTasks);

  return (
    <div>
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className=" h-[750px] overflow-auto space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <h1>{task.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="grid place-content-center"
                title="Details"
              >
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  title="Task Details"
                >
                  <div>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                    <p>{task.assignTo}</p>
                    <p>{task.createdAt}</p>
                  </div>
                </Modal>
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() => {
                  dispatch(updateStatus({ id: task.id, status: "completed" }));
                }}
                className="grid place-content-center"
                title="Done"
              >
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
