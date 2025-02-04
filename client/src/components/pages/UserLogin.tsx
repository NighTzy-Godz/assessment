import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { UserLoginData } from "@/interfaces/UserInterfaces";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "@/store/userApi";
import { useEffect } from "react";
import { renderError, setStorageItem } from "@/lib/utils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UserLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>();

  const [loginUser, { data, error, isLoading, isSuccess }] =
    userApi.useLoginUserMutation();

  const handleUserLoginSubmit = (data: UserLoginData) => {
    loginUser(data);
  };

  useEffect(() => {
    if (error) {
      renderError(error);
    }

    if (isSuccess) {
      toast.success("Successfully Logged In");
      setStorageItem("token", data);
      navigate("/profile");
    }
  }, [error, isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleUserLoginSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Login Here</h2>
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
        {isLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="mb-1" type="submit">
            Login
          </Button>
        )}
        <p className="text-sm text-gray-700">
          Don't Have an Account? Register{" "}
          <Link className="text-blue-500 underline" to="/register">
            Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
