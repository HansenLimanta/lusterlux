import { type NextPage } from "next";
import Link from "next/link";
import Meta from "../../components/Meta";
import { trpc } from "../../utils/trpc";

const AdminPage: NextPage = () => {
  return (
    <>
      <Meta />
      <main className="flex flex-col items-center">
        <h1 className="pt-4 text-3xl">Admin</h1>
        <div className="flex">
          <Link href="/">
            <p className="m-4 rounded-lg border border-black px-2 py-1 hover:border-emerald-600 hover:text-emerald-600">
              Home
            </p>
          </Link>
          <Link href="/admin/addProduct">
            <p className="m-4 rounded-lg border border-black px-2 py-1 hover:border-emerald-600 hover:text-emerald-600">
              Add Product
            </p>
          </Link>
        </div>
        <Products />
      </main>
    </>
  );
};

export default AdminPage;

const Products = () => {
  const { data: products, isLoading } = trpc.products.getProducts.useQuery();
  const utils = trpc.useContext();
  const mutation = trpc.products.deleteProduct.useMutation({
    onSuccess: () => {
      utils.products.getProducts.invalidate();
    },
  });

  if (isLoading) return <div>Fetching products...</div>;

  return (
    <div className="flex flex-col gap-4">
      {products?.map((product, index) => {
        const { name, price, stock, id } = product;

        return (
          <div
            key={index}
            className="mt-3 grid grid-cols-5 place-items-center gap-1 rounded-md bg-stone-200 px-4 py-2"
          >
            <p>{name}</p>
            <p>{price}</p>
            <p>{stock}</p>
            <Link href={`/admin/edit/${id}`}>
              <button className="w-32 rounded-md border border-emerald-700 bg-white p-1">
                Edit
              </button>
            </Link>
            <button
              className="w-32 rounded-md border border-emerald-700 bg-white p-1"
              onClick={() => {
                mutation.mutate({ id });
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};
