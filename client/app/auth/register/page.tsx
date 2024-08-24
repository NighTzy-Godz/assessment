"use client";
import ContentCenter from "@/components/ContentCenter";
import Input from "@/components/forms/Input";
import InputError from "@/components/forms/InputError";
import InputLabel from "@/components/forms/InputLabel";
import FormWidth from "@/components/FormWidth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const url = `${apiUrl}/registerUser`;
interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPass: string;
}

function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterUserData>();
  const router = useRouter();
  const handleRegisterSubmit: SubmitHandler<RegisterUserData> = async (
    data: RegisterUserData
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

      if (resBody.status > 400 && resBody.status <= 500) {
        toast.error(resBody.msg);
      } else {
        toast.success(resBody.msg);
        router.push("/auth/login");
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
            <h1 className="text-3xl text-mainColor mb-2">Register Form</h1>
            <p className="text-lg text-textColor w-[70%] mx-auto leading-tight">
              In order to purchase some of the products, you need to create an
              account first.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegisterSubmit)}
            className=" w-full pb-5"
          >
            <div className="mb-5  sm:flex gap-3">
              <div className="w-full sm:mb-0 mb-5">
                <InputLabel>First Name</InputLabel>
                <Input
                  placeholder="Ex. John Qt"
                  {...register("firstName", {
                    required: "First Name is a required field",
                    minLength: {
                      value: 2,
                      message: "First Name should contain atleast 2 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "First Name can only contain 20 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <InputError errMsg={errors.firstName.message} />
                )}
              </div>
              <div className="w-full">
                <InputLabel>Last Name</InputLabel>
                <Input
                  placeholder="Ex. Elmerized"
                  {...register("lastName", {
                    required: "Last Name is a required field",
                    minLength: {
                      value: 2,
                      message: "Last Name should contain atleast 2 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Last Name can only contain 20 characters",
                    },
                  })}
                />
                {errors.lastName && (
                  <InputError errMsg={errors.lastName.message} />
                )}
              </div>
            </div>

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

            <div className="mb-5  sm:flex gap-3">
              <div className="w-full sm:mb-0 mb-5">
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
              <div className="w-full">
                <InputLabel>Confirm Password</InputLabel>
                <Input
                  placeholder="Ex. Desired Password"
                  type="password"
                  {...register("confirmPass", {
                    required: "Confirm Password is a required field",
                    minLength: {
                      value: 5,
                      message:
                        "Confirm Password should contain atleast 5 characters",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Confirm Password can only contain 20 characters",
                    },
                  })}
                />
                {errors.confirmPass && (
                  <InputError errMsg={errors.confirmPass.message} />
                )}
              </div>
            </div>

            <button className="bg-textColor mb-2 w-full py-2 text-lg text-bgColor hover:bg-textColorDark rounded-xl">
              Register
            </button>

            <p className="text-textColor">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-mainColor hover:underline"
              >
                Login Here.
              </Link>
            </p>
          </form>
        </FormWidth>
      </div>
    </ContentCenter>
  );
}

export default Register;
