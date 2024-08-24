import ContentCenter from "@/components/ContentCenter";
import formatCurrency from "@/utils/formatCurreny";
import Link from "next/link";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ItemData {
  id: number;
  title: string;
  desc: string;
  price: number;
  img: string;
}

export default async function Home() {
  const url = `${apiUrl}/items`;

  const res = await fetch(url, {
    method: "GET",
  });
  const resBody = await res.json();
  const { data, total } = resBody.data;
  const items: ItemData[] = data;

  const renderContent = () => {
    if (items.length === 0) {
      return (
        <ContentCenter>
          <h1 className="md:text-5xl sm:text-4xl text-3xl text-textColor text-center md:w-[80%] w-full capitalize">
            There's no Items at the moment. Maybe you want to add some?
          </h1>
        </ContentCenter>
      );
    }
    return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {items.map((item) => (
          <div className="shadow-xl rounded-md p-2 " key={item.id}>
            <Link className="mb-2 block" href={`/item/${item.id}`}>
              {" "}
              <img
                src={item.img}
                className="h-56 w-full rounded-md object-cover"
              />
            </Link>

            <div className="">
              <h1 className="text-mainColor text-2xl mb-1">{item.title} </h1>
              <p className="text-textColor text-lg">
                {formatCurrency(item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="py-10">
      <div className="container mx-auto">{renderContent()}</div>
    </div>
  );
}
