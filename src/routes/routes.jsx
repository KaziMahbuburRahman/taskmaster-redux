import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateRoute from "../components/layouts/PrivateRoute";
import Archive from "../pages/Archive";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Signup from "../pages/Signup";
import Tasks from "../pages/Tasks";
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <PrivateRoute>
          <App />
        </PrivateRoute>
      </>
    ),
    children: [
      {
        index: true,
        element: <Tasks />,
      },
      {
        path: "/archive",
        element: <Archive />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default routes;
