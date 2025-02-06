import { getStorageItem, removeStorageItem } from "@/lib/utils";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { userApi } from "@/store/userApi";
import IUser from "@/interfaces/UserInterfaces";
import InputSkeleton from "../ui/input_skeleton";
import ImageSkeleton from "../ui/image_skeleton";
import { Loader2 } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, error, refetch } =
    userApi.useGetUserDataQuery("");

  const {
    first_name,
    last_name,
    profile_image,
    middle_name,
    email,
    phone_number,
  } = (data as IUser) || {};

  useEffect(() => {
    const token = getStorageItem("token");
    if (!token) {
      toast.warning("You need to authenticate first", { id: "Register" });
      navigate("/login");
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    removeStorageItem("token");
    toast.success("Successfully Logged Out");
    navigate("/login");
  };

  const handleTryAgain = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-5 min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl mb-4">User Profile</h2>

          <ImageSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-5 min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl mb-4">User Profile</h2>
          <p className="text-red-500 mb-1">Failed to load user data</p>

          {isFetching ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={handleTryAgain}>Try Again</Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-5 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">User Profile</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Profile Image</label>
          {profile_image ? (
            <img
              src={profile_image}
              alt="Profile"
              className="w-full  rounded mt-1"
            />
          ) : (
            <p className="w-full p-2 border border-gray-300 rounded mt-1">
              No profile image
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {first_name}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {last_name}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Middle Name</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {middle_name || "N/A"}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {email}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {phone_number}
          </p>
        </div>

        <Button
          onClick={handleLogoutClick}
          className="bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
