import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser, toggleLoading } from "../../redux/features/tasks/userSlice";
import { auth } from "../../utils/firebase.config";
import Preloader from "../shared/Preloader";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { email, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Extract only serializable properties from the user object
        const serializableUser = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user?.photoURL,
        };
        dispatch(setUser(serializableUser));
      } else {
        dispatch(toggleLoading(false));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  // Show nothing while checking authentication
  if (isLoading) {
    return <Preloader />;
  }

  // If not loading and no user, redirect to login
  if (!email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  // If we have a user, render the protected content
  return children;
};

export default PrivateRoute;
