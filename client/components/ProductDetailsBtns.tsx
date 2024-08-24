"use client";
import Link from "next/link";
import React from "react";
import DeleteItemBtn from "./DeleteItemBtn";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function ProductDetailsBtns({ itemId }: { itemId: number }) {
  const url = `${apiUrl}/items/${itemId}`;
  const { user } = useAuth();
  const router = useRouter();
  const handleDeleteItem = async () => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token") || "",
      },
    });

    const resBody = await res.json();
    if (resBody.status >= 400 || resBody.status <= 500) {
      toast.error(resBody.msg);
    }
    if (resBody.status === 200) {
      toast.success(`${resBody.msg}. Please refresh`);

      router.push("/");
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-3 mb-5">
        <Link
          href={`/item/editItem/${itemId}`}
          className="text-lg px-5 py-2 bg-textColor rounded-3xl text-bgColor hover:bg-textColorDark"
        >
          Edit Item
        </Link>
        <DeleteItemBtn onDeleteClick={handleDeleteItem} />
      </div>
    );
  }

  return null;
}

export default ProductDetailsBtns;
