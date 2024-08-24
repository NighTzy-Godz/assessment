"use client";
import ContentCenter from "@/components/ContentCenter";
import FileUploader from "@/components/forms/FileUploader";
import Input from "@/components/forms/Input";
import InputError from "@/components/forms/InputError";
import InputLabel from "@/components/forms/InputLabel";
import TextArea from "@/components/forms/TextArea";
import FormWidth from "@/components/FormWidth";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface PreCreateItemData {
  img: FileList;
  title: string;
  desc: string;
  price: number;
}

function AddItem() {
  const url = `${apiUrl}/items`;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreCreateItemData>();

  const handleAddItemSubmit = async (data: PreCreateItemData) => {
    const { title, img, desc, price } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("img", img[0]);
    formData.append("desc", desc);
    formData.append("price", price.toString());
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "x-auth-token": localStorage.getItem("token") || "",
        },
        body: formData,
      });

      const resBody = await res.json();
      if (resBody.status > 400 || resBody.status <= 500) {
        toast.error(resBody.msg);
      }
      if (resBody.data || resBody.status === 201) {
        toast.success(`${resBody.msg}. Please Refresh`);

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContentCenter>
      <div className="container mx-auto">
        <FormWidth>
          <div className="mb-10 text-center">
            <h1 className="text-3xl text-mainColor mb-2">Add Item</h1>
            <p className="text-lg text-textColor w-[70%] mx-auto leading-tight">
              Showcase to the world your item! Fill up the form below.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleAddItemSubmit)} className="pb-5">
            <div className="mb-8">
              <InputLabel>Product Name</InputLabel>
              <Input
                placeholder="Ex. Sofa Matress"
                {...register("title", {
                  required: "Product Name is a required field",
                })}
              />
              {errors.title && <InputError errMsg={errors.title.message} />}
            </div>

            <div className="mb-8">
              <FileUploader
                {...register("img", { required: "Image is a required field" })}
              />{" "}
              {errors.img && <InputError errMsg={errors.img.message} />}
            </div>

            <div className="mb-8">
              <InputLabel>Product Price</InputLabel>
              <Input
                placeholder="Ex. 350"
                type="number"
                {...register("price", {
                  required: "Product Price is a required field",
                })}
              />
              {errors.price && <InputError errMsg={errors.price.message} />}
            </div>

            <div className="mb-8">
              <InputLabel>Product Description</InputLabel>
              <TextArea
                placeholder="Ex. This item provides the . . . ."
                {...register("desc", {
                  required: "Product Description is a required field",
                  minLength: {
                    message:
                      "Product Description should contain atleast 10 characters",
                    value: 10,
                  },
                  maxLength: {
                    value: 300,
                    message:
                      "Product Description can only contain 300 characters",
                  },
                })}
              />
              {errors.desc && <InputError errMsg={errors.desc.message} />}
            </div>

            <button className="bg-textColor mb-2 w-full py-2 text-lg text-bgColor hover:bg-textColorDark rounded-xl">
              Add Product
            </button>
          </form>
        </FormWidth>
      </div>
    </ContentCenter>
  );
}

export default AddItem;
