import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { userApi } from "@/store/userApi";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import IUser from "@/interfaces/UserInterfaces";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { renderError } from "@/lib/utils";

const UserRegister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const [registerUser, { data, isLoading, error, isSuccess }] =
    userApi.useRegisterUserMutation();

  const handleUserRegisterSubmit = (data: IUser) => {
    const {
      first_name,
      last_name,
      profile_image,
      phone_number,
      email,
      middle_name,
    } = data;

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("middle_name", middle_name || "");
    formData.append("profile_image", profile_image[0]);
    registerUser(formData);
  };

  useEffect(() => {
    if (error) {
      renderError(error);
    }

    if (isSuccess) {
      console.log("Res Data - ", data);
      toast.success("User Registered Successfully", { id: "user_exists" });
      navigate("/login");
    }
  }, [error, isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleUserRegisterSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Register User</h2>
        <div className="mb-4">
          <Label className="block text-gray-700">First Name</Label>
          <Input
            type="text"
            {...register("first_name", {
              required: "First Name is required",
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">
              {errors.first_name.message as string}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Label className="block text-gray-700">Last Name</Label>
          <Input
            type="text"
            {...register("last_name", { required: "Last Name is required" })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">
              {errors.last_name.message as string}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Label className="block text-gray-700">Middle Name (Optional)</Label>
          <Input
            type="text"
            {...register("middle_name")}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <Label className="block text-gray-700">Email</Label>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Label className="block text-gray-700">Phone Number</Label>
          <Input
            type="tel"
            {...register("phone_number", {
              required: "Phone Number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm">
              {errors.phone_number.message as string}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Label className="block text-gray-700">Profile Image</Label>
          <Input
            type="file"
            multiple
            {...register("profile_image", {
              required: "Profile Image is required",
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.profile_image && (
            <p className="text-red-500 text-sm">
              {errors.profile_image.message as string}
            </p>
          )}
        </div>
        {isLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="mb-1" type="submit">
            Register User
          </Button>
        )}

        <p className="text-sm text-gray-700">
          Already Have an Account? Login{" "}
          <Link className="text-blue-500 underline" to="/login">
            Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegister;
