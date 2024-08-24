"use client";
import React from "react";
import InputLabel from "./forms/InputLabel";
import Input from "./forms/Input";
import FileUploader from "./forms/FileUploader";
import InputError from "./forms/InputError";
import TextArea from "./forms/TextArea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface EditItemData {
  img: FileList;
  title: string;
  desc: string;
  price: number;
}

interface EditItemProps {
  item: {
    id: string;
    title: string;
    desc: string;
    price: number;
    img: any;
  };
}
function EditItemForm({ item }: EditItemProps) {
  const url = `${apiUrl}/items/${item.id}`;
  const values: EditItemData = {
    title: item.title,
    desc: item.desc,
    price: item.price,
    img: item.img,
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditItemData>({ values });

  const handleAddItemSubmit = async (data: EditItemData) => {
    const { title, img, desc, price } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("img", img[0]);
    formData.append("desc", desc);
    formData.append("price", price.toString());
    try {
      const res = await fetch(url, {
        method: "PUT",
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
        toast.success(resBody.msg);
        router.push(`/item/${item.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
              message: "Product Description can only contain 300 characters",
            },
          })}
        />
        {errors.desc && <InputError errMsg={errors.desc.message} />}
      </div>

      <button className="bg-textColor mb-2 w-full py-2 text-lg text-bgColor hover:bg-textColorDark rounded-xl">
        Edit Product
      </button>
    </form>
  );
}

export default EditItemForm;
