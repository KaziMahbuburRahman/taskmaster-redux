import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Tasks from '../pages/Tasks';
import Chat from '../pages/Chat';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Tasks />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default routes;
