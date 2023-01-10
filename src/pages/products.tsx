import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Meta from "../components/Meta";
import { useAtom } from "jotai";
import { userAtom } from "./_app";
import ProductItem from "../components/ProductItem";

const ProductsPage: NextPage = () => {
  const [user] = useAtom(userAtom);
  const { data: products, isLoading } = trpc.products.getProducts.useQuery();
  const utils = trpc.useContext();
  const addToCart = trpc.cart.addCartItem.useMutation({
    onSuccess: () => {
      utils.cart.getCartItems.invalidate();
    },
  });

  const handleAddProduct = (
    userId: string,
    productId: string,
    quantity: number,
    name: string,
    price: number
  ) => {
    addToCart.mutate({ userId, productId, quantity, name, price });
  };

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
          return (
            <ProductItem
              key={index}
              userId={user.userId}
              product={product}
              handleAddProduct={handleAddProduct}
            />
          );
        })}
      </main>
    </>
  );
};

export default ProductsPage;
