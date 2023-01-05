import { type NextPage } from "next";
import Link from "next/link";
import Meta from "../components/Meta";

const HomePage: NextPage = () => {
  return (
    <>
      <Meta />
      <main className="flex flex-col items-center">
        <h1 className="pt-4 text-3xl">HOME PAGE</h1>
        <Link href="/admin">
          <p className="mt-8 rounded-lg border border-black px-2 py-1 hover:border-emerald-600 hover:text-emerald-600">
            admin page
          </p>
        </Link>
        <Link href="/products">
          <p className="m-6 rounded-lg border border-black px-2 py-1 hover:border-emerald-600 hover:text-emerald-600">
            Products
          </p>
        </Link>
      </main>
    </>
  );
};

export default HomePage;
