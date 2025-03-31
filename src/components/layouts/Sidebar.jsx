import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/image/logo.png";
// import { logout } from "../../redux/features/tasks/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <div className="h-screen sticky top-0 border-r-2 border-secondary/20">
      <div className="flex flex-col items-center gap-5 h-full py-5">
        <img src={logo} alt="logo" />
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
              : "p-2 rounded-2xl group hover:bg-primary text-secondary/40 cursor-pointer transition-all"
          }
        >
          <SquaresPlusIcon className="h-7 w-7 group-hover:text-white" />
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
              : "p-2 rounded-2xl group hover:bg-primary text-secondary/40 cursor-pointer transition-all"
          }
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7 group-hover:text-white " />
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
              : "p-2 rounded-2xl group hover:bg-primary text-secondary/40 cursor-pointer transition-all"
          }
        >
          <Cog6ToothIcon className="h-7 w-7 group-hover:text-white " />
        </NavLink>
        <div className="mt-auto flex flex-col items-center gap-4">
          {currentUser && (
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium">{currentUser.name}</span>
            </div>
          )}
          <button
            // onClick={handleLogout}
            className="p-2 rounded-2xl group hover:bg-red-500 text-secondary/40 hover:text-white cursor-pointer transition-all"
            title="Logout"
          >
            <ArrowLeftOnRectangleIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
