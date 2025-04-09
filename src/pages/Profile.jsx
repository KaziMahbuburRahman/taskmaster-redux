import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { auth, db } from "../utils/firebase.config";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: currentUser?.displayName || "",
      email: currentUser?.email || "",
    },
  });

  const handleProfileUpdate = async (data) => {
    try {
      setIsLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
      });

      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        displayName: data.displayName,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      reset(data);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={
                currentUser?.photoURL ||
                "https://ui-avatars.com/api/?name=User&background=random"
              }
              alt={currentUser?.displayName || "User"}
              className="h-32 w-32 rounded-full object-cover"
            />
            <button
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
              title="Change Profile Picture"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-semibold mb-2">
              {currentUser?.displayName || "User"}
            </h1>
            <p className="text-gray-600">{currentUser?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since{" "}
              {new Date(currentUser?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(handleProfileUpdate)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                {...register("displayName")}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                disabled
                className="w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Display Name
              </h3>
              <p className="mt-1">{currentUser?.displayName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Email</h3>
              <p className="mt-1">{currentUser?.email}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Activity Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-xl font-medium mb-4">Activity Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700">Total Tasks</h3>
            <p className="text-2xl font-semibold mt-1">0</p>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700">
              Completed Tasks
            </h3>
            <p className="text-2xl font-semibold mt-1">0</p>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700">In Progress</h3>
            <p className="text-2xl font-semibold mt-1">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
