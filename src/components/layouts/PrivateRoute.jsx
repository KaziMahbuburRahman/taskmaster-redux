import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser, toggleLoading } from "../../redux/features/tasks/userSlice";
import { auth } from "../../utils/firebase.config";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { email, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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

    // return () => {
    //   second;
    // };
  }, [dispatch]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (!email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  } else {
    return children;
  }
};

export default PrivateRoute;
