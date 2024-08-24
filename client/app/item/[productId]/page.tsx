import DeleteItemBtn from "@/components/DeleteItemBtn";
import ProductDetailsBtns from "@/components/ProductDetailsBtns";
import { useAuth } from "@/context/AuthProvider";
import formatCurrency from "@/utils/formatCurreny";
import Link from "next/link";
import { toast } from "sonner";

export interface ItemData {
  id: number;
  desc: string;
  img: string;
  price: number;
  title: string;
}

async function ProductDetails({ params }: { params: { productId: string } }) {
  const res = await fetch(
    `http://localhost:8080/api/items/${params.productId}`,
    {
      method: "GET",
    }
  );

  const { data } = await res.json();
  const item: ItemData = data;

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-1/2">
            <img
              src={item.img}
              className="h-[400px] object-cover rounded-lg"
              alt=""
            />
          </div>

          <div className="w-1/2">
            <ProductDetailsBtns itemId={item.id} />
            <h1 className="text-5xl text-mainColor mb-2">{item.title}</h1>
            <p className="text-lg text-textColor/75 mb-10">
              {formatCurrency(item.price)}
            </p>

            <p className="text-lg text-textColor">{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
