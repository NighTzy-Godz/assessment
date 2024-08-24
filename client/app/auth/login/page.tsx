"use client";
import ContentCenter from "@/components/ContentCenter";
import Input from "@/components/forms/Input";
import InputError from "@/components/forms/InputError";
import InputLabel from "@/components/forms/InputLabel";
import FormWidth from "@/components/FormWidth";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UserLoginData {
  email: string;
  password: string;
}

function Login() {
  const url = `${apiUrl}/loginUser`;
  const { login } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserLoginData>();
  const router = useRouter();
  const handleLoginSubmit: SubmitHandler<UserLoginData> = async (
    data: UserLoginData
  ) => {
    try {
      const resp = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const resBody = await resp.json();

      if (resBody.status > 400 || resBody.status <= 500) {
        toast.error(resBody.msg);
      }
      if (resBody.data || resBody.status === 201) {
        login(resBody.data);
        toast.success(resBody.msg);

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContentCenter>
      <div className="container mx-auto ">
        <FormWidth>
          <div className="mb-10 text-center">
            <h1 className="text-3xl text-mainColor mb-2">Login Form</h1>
            <p className="text-lg text-textColor w-[70%] mx-auto leading-tight">
              In order to purchase some of the products, you need to
              authenticate first.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="mb-5">
              <InputLabel>Email</InputLabel>
              <Input
                placeholder="youremail@gmail.com"
                type="email"
                {...register("email", {
                  required: "Email is a required field",
                })}
              />
              {errors.email && <InputError errMsg={errors.email.message} />}
            </div>

            <div className="mb-5  flex gap-3">
              <div className="w-full">
                <InputLabel>Password</InputLabel>
                <Input
                  placeholder="Ex. Desired Password"
                  type="password"
                  {...register("password", {
                    required: "Password is a required field",
                    minLength: {
                      value: 5,
                      message: "Password should contain atleast 5 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password can only contain 20 characters",
                    },
                  })}
                />
                {errors.password && (
                  <InputError errMsg={errors.password.message} />
                )}
              </div>
            </div>

            <button className="bg-textColor mb-2 w-full py-2 text-lg text-bgColor hover:bg-textColorDark rounded-xl">
              Register
            </button>

            <p className="text-textColor">
              Don&apos;t have an account?
              <Link
                href="/auth/register"
                className="text-mainColor hover:underline"
              >
                Register Here.
              </Link>
            </p>
          </form>
        </FormWidth>
      </div>
    </ContentCenter>
  );
}

export default Login;
