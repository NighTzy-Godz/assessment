import React from "react";

import ContentCenter from "@/components/ContentCenter";

import FormWidth from "@/components/FormWidth";

import EditItemForm from "@/components/EditItemForm";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function EditItem({ params }: { params: { productId: string } }) {
  const url = `${apiUrl}/items/${params.productId}`;

  const res = await fetch(url);

  const { data } = await res.json();

  const item = data;

  return (
    <ContentCenter>
      <div className="container mx-auto">
        <FormWidth>
          <div className="mb-10 text-center">
            <h1 className="text-3xl text-mainColor mb-2">Edit Item</h1>
            <p className="text-lg text-textColor w-[70%] mx-auto leading-tight">
              Edit the changes for your item.
            </p>
          </div>
          <EditItemForm item={item} />
        </FormWidth>
      </div>
    </ContentCenter>
  );
}

export default EditItem;
