import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/image/login.svg";
import { createUser } from "../redux/features/tasks/userSlice";

const Signup = () => {
  const { handleSubmit, register, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { error, isError } = useSelector((state) => state.users);
  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = ({ name, email, password }) => {
    // Email Password signup
    console.log(name, email, password);
    dispatch(createUser({ name, email, password }));
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error);
    }
  }, [isError, error]);
  // const handleGoogleLogin = () => {
  //   // Google Login
  //   console.log("google login");
  // };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto min-h-screen items-center p-4">
      <div className="w-full md:w-1/2 hidden md:block">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-full md:w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-6 md:p-10">
          <h1 className="mb-6 md:mb-10 font-medium text-xl md:text-2xl">
            Sign up
          </h1>
          <form
            className="space-y-4 md:space-y-5 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-start">
              <label htmlFor="email" className="mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register("password")}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="confirm-password" className="mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full rounded-md"
                {...register("confirmPassword")}
              />
            </div>
            <div className="!mt-6 md:!mt-8">
              <button
                type="submit"
                className="btn btn-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={disabled}
              >
                Sign up
              </button>
            </div>
            <div>
              <p className="text-sm md:text-base">
                Already have an account?{" "}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary w-full"
              // onClick={handleGoogleLogin}
            >
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
