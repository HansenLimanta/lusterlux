import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Meta from "../components/Meta";
import { useAtom } from "jotai";
import { userAtom } from "./_app";
import ProductItem from "../components/ProductItem";
import { useState } from "react";

const ProductsPage: NextPage = () => {
  const [needLogin, setNeedLogin] = useState(false);
  const [user] = useAtom(userAtom);
  const { data: products, isLoading } = trpc.products.getProducts.useQuery();
  const handleNeedToLogin = () => {
    setNeedLogin(true);
  };

  if (isLoading)
    return (
      <div className="flex h-80 w-screen items-center justify-center ">
        <div className="animate-pulse rounded-full bg-emerald-200 px-5 py-3 text-center text-base font-medium leading-none text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
          loading...
        </div>
      </div>
    );

  return (
    <>
      <Meta />
      <main className="flex flex-col items-center">
        <h1 className="pt-4 text-3xl">Products</h1>
        <Link href="/">
          <p className="m-4 rounded-lg border border-black px-2 py-1 hover:border-emerald-600 hover:text-emerald-600">
            Home
          </p>
        </Link>
        {products?.map((product, index) => {
          return (
            <ProductItem
              key={index}
              userId={user.userId}
              product={product}
              handleNeedToLogin={handleNeedToLogin}
            />
          );
        })}
        {needLogin ? (
          <div className="fixed top-1/2 left-1/2 flex h-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl border-2 border-black bg-slate-100">
            <p className="px-8 font-medium text-red-600">
              YOU NEED TO LOGIN FIRST
            </p>
            <button
              className="mt-2 rounded-md border border-black bg-white px-2"
              onClick={() => setNeedLogin(false)}
            >
              close
            </button>
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default ProductsPage;
