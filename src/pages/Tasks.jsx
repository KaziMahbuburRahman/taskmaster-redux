import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddTaskModal from "../components/tasks/AddTaskModal";
import MyTasks from "../components/tasks/MyTasks";
import TaskCard from "../components/tasks/TaskCard";
import MenuDropdown from "../components/ui/MenuDropdown";
import { useGetTasksQuery } from "../redux/features/api/tasksApiSlice";
import { auth } from "../utils/firebase.config";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();
  const { users } = useSelector((state) => state.allUsers);
  console.log("users", users);
  // const currentUserName = users?.find((user) => user.uid === currentUserName?.uid)
  console.log("all tasks", tasks);
  const currentUserName = auth.currentUser?.displayName;
  const myPendingTasks = tasks?.filter(
    (item) => item.status === "pending" && item.assignTo === currentUserName
  );
  const myRunningTasks = tasks?.filter(
    (item) => item.status === "in-progress" && item.assignTo === currentUserName
  );
  const myDoneTasks = tasks?.filter(
    (item) => item.status === "completed" && item.assignTo === currentUserName
  );

  const othersPendingTasks = tasks?.filter(
    (item) => item.status === "pending" && item.assignTo !== currentUserName
  );
  const othersRunningTasks = tasks?.filter(
    (item) => item.status === "in-progress" && item.assignTo !== currentUserName
  );
  const othersDoneTasks = tasks?.filter(
    (item) => item.status === "completed" && item.assignTo !== currentUserName
  );

  const getTaskId = (task) => {
    return task._id || task.id;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <>
      <AddTaskModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="h-screen grid grid-cols-12">
        <div className="col-span-9 px-10 pt-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-3xl">Tasks</h1>
            </div>
            <div className="flex gap-5">
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
                <BellIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-primary"
              >
                Add Task
              </button>
              <MenuDropdown>
                <div className="h-10 w-10 rounded-xl overflow-hidden">
                  <img
                    src={auth.currentUser.photoURL}
                    alt={auth.currentUser.displayName}
                    className="object-cover h-full w-full"
                  />
                </div>
              </MenuDropdown>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-10">
            <div className="relative h-[800px] overflow-auto">
              <div className="flex sticky top-0  justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>Up Next</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {myPendingTasks?.length + othersPendingTasks?.length}
                </p>
              </div>
              <div className="space-y-3">
                {/* console */}

                {myPendingTasks?.map((item) => (
                  <TaskCard key={getTaskId(item)} task={item} />
                ))}
                {othersPendingTasks?.map((item) => (
                  <TaskCard key={getTaskId(item)} task={item} />
                ))}
              </div>
            </div>
            <div className="relative h-[800px] overflow-auto">
              <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>In Progress</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {myRunningTasks?.length + othersRunningTasks?.length}
                </p>
              </div>
              <div className="space-y-3">
                {myRunningTasks?.map((item) => (
                  <TaskCard key={getTaskId(item)} task={item} />
                ))}
                {othersRunningTasks?.map((item) => (
                  <TaskCard key={getTaskId(item)} task={item} />
                ))}
              </div>
            </div>
            <div className="relative h-[800px] overflow-auto">
              <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>Done</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {myDoneTasks?.length + othersDoneTasks?.length}
                </p>
              </div>
              <div className="space-y-3">
                {myDoneTasks?.map((item) => (
                  <TaskCard key={getTaskId(item)} task={item} />
                ))}
                {othersDoneTasks?.map((item) => (
                  <TaskCard key={getTaskId(item)} task={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 border-l-2 border-secondary/20 px-10 pt-10">
          <div>
            <h1 className="text-xl">Members</h1>
            <div className="flex gap-3 mt-3">
              {users.map((user) => (
                <div
                  key={user.uid}
                  className="h-10 w-10 rounded-xl overflow-hidden"
                >
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="object-cover h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <MyTasks tasks={tasks} />
        </div>
      </div>
    </>
  );
};

export default Tasks;
