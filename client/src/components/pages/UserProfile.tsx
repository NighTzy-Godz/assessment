import { removeStorageItem } from "@/lib/utils";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const user = {
  first_name: "aser",
  last_name: "Hubero",
  middle_name: "",
  email: "aser@email.com",
  phone_number: "0998 490 7193",
  profile_image:
    "https://res.cloudinary.com/aserpogi/image/upload/v1738682846/assessment/pavuffejnau00s2q302u.jpg",
};

const UserProfile = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    removeStorageItem("token");
    toast.success("Successfully Logged Out");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">User Profile</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Profile Image</label>
          {user.profile_image ? (
            <img
              src={user.profile_image}
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
            {user.first_name}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {user.last_name}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Middle Name</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {user.middle_name || "N/A"}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {user.email}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <p className="w-full p-2 border border-gray-300 rounded mt-1">
            {user.phone_number}
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
