import { type NextPage } from "next";
import Card from "../components/Card";
import Meta from "../components/Meta";
import { BsChevronDown } from "react-icons/bs";

const HairMatchPage: NextPage = () => {
  return (
    <>
      <Meta />
      <main className="flex flex-col items-center">
        <h1 className="p-4 text-3xl">HAIR MATCH PAGE</h1>
        <h2 className="p-4 text-2xl">Choose your preferred style</h2>
        <div className="pb-4">
          <button className="mr-2 mb-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
            Short Hair
          </button>
          <button className="mr-2 mb-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
            Long Hair
          </button>
        </div>
        <div className="flex gap-10 pb-8">
          <Card
            tags={["#longhair", "#darkbrown", "#mantoel", "#serious"]}
            imgUrl={"/hair-potrait-1.jpg"}
          />
          <Card
            tags={["#shorthair", "#redhead", "#curly", "#nice", "tagss1"]}
            imgUrl={"/hair-potrait-1.jpg"}
          />
          <Card
            tags={["#longhair", "#silver", "#wavy", "#qqqqq"]}
            imgUrl={"/hair-potrait-1.jpg"}
          />
        </div>
        <div className="flex cursor-pointer flex-col items-center hover:text-emerald-700">
          <p className="pb-2 text-lg">view matching products</p>
          <BsChevronDown className="animate-bounce" />
        </div>
      </main>
    </>
  );
};

export default HairMatchPage;
