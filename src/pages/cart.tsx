import { useEffect, useState } from "react";
import { GetServerSidePropsContext, type NextPage } from "next";
import { useAtom } from "jotai";
import { userAtom, cartAtom } from "./_app";
import { trpc } from "../utils/trpc";
import Meta from "../components/Meta";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { role } from "../utils/constant";
import CartItem from "../components/CartItem";

const CartPage: NextPage = () => {
  const [user] = useAtom(userAtom);
  const [cartList, setCartList] = useAtom(cartAtom);
  const { data: cartItem, isLoading } = trpc.cart.getCartItems.useQuery({
    id: user.userId,
  });

  useEffect(() => {
    if (cartItem !== undefined) {
      setCartList(cartItem);
    } else {
      setCartList([]);
    }
  }, [cartItem]);

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
      <main className="my-20 flex flex-col items-center">
        <div className="mt-10 flex flex-col gap-4">
          <h1 className="text-3xl">Cart</h1>
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {cartList?.map((product, index) => {
                return <CartItem product={product} key={index} />;
              })}
            </tbody>
          </table>

          <button className=" mb-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
            Checkout
          </button>
        </div>
      </main>
    </>
  );
};

export default CartPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (!session || session.user?.role === role.admin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
