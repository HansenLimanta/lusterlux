import { useEffect } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isLoggedAtom, userIdAtom } from "./_app";
import { trpc } from "../utils/trpc";
import Meta from "../components/Meta";

const CartPage: NextPage = () => {
  const [isLogged] = useAtom(isLoggedAtom);
  const [userId] = useAtom(userIdAtom);

  const utils = trpc.useContext();
  const router = useRouter();
  const { data: cartItem, status } = trpc.cart.getCartItems.useQuery({
    id: userId,
  });
  const deleteCartItem = trpc.cart.deleteCartItem.useMutation({
    onSuccess: () => {
      utils.cart.getCartItems.invalidate();
    },
  });
  const addToCart = trpc.cart.addCartItem.useMutation({
    onSuccess: () => {
      utils.cart.getCartItems.invalidate();
    },
  });

  useEffect(() => {
    if (!isLogged) {
      router.push("/");
    }
  }, [isLogged]);

  if (status === "loading")
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
          {cartItem?.map((product, index) => {
            const { name, quantity, id, productId, userId, price } = product;

            return (
              <div
                key={index}
                className="mt-1 grid grid-cols-4 place-items-center rounded-md bg-stone-200 px-4 py-2"
              >
                <p>{name}</p>
                <div className="flex gap-2">
                  <button
                    className="w-8 rounded-md border border-emerald-700 bg-white"
                    onClick={() => {
                      deleteCartItem.mutate({
                        id,
                      });
                    }}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    className="w-8 rounded-md border border-emerald-700 bg-white"
                    onClick={() => {
                      addToCart.mutate({
                        userId: userId,
                        productId: productId,
                        quantity: 1,
                        name,
                        price,
                      });
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="w-32 rounded-md border border-emerald-700 bg-white p-1"
                  onClick={() => {
                    deleteCartItem.mutate({
                      id,
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <h2>Checkout</h2>
        </div>
      </main>
    </>
  );
};

export default CartPage;
