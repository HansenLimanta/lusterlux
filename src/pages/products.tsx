import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Meta from "../components/Meta";
import { useAtom } from "jotai";
import { userIdAtom } from "./_app";

const ProductsPage: NextPage = () => {
  const [userId] = useAtom(userIdAtom);
  const { data: products, isLoading } = trpc.products.getProducts.useQuery();
  const utils = trpc.useContext();
  const addToCart = trpc.cart.addCartItem.useMutation({
    onSuccess: () => {
      utils.cart.getCartItems.invalidate();
    },
  });

  if (isLoading) return <div>Fetching products...</div>;

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
          const { name, price, stock, id } = product;

          return (
            <div
              key={index}
              className="mt-3 grid grid-cols-4 place-items-center rounded-md bg-stone-200 px-4 py-2"
            >
              <p>{name}</p>
              <p>{price}</p>
              <p>{stock}</p>
              <button
                className="w-32 rounded-md border border-emerald-700 bg-white p-1"
                onClick={() => {
                  addToCart.mutate({
                    userId: userId,
                    productId: id,
                    quantity: 1,
                    name,
                    price,
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default ProductsPage;
