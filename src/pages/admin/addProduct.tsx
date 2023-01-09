import { GetServerSidePropsContext, type NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import Meta from "../../components/Meta";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { role } from "../../utils/constant";

type Inputs = {
  name: string;
  price: number;
  stock: number;
};

const AddProduct: NextPage = () => {
  const mutation = trpc.products.addProduct.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>();

  const addProduct: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  useEffect(() => {
    reset({
      name: "",
      price: 0,
      stock: 0,
    });
  }, [isSubmitSuccessful]);

  return (
    <>
      <Meta />
      <main className="flex flex-col items-center">
        <h1 className="pt-4 text-3xl">Add Item</h1>
        <Link href="/admin">
          <p className="m-4 rounded-lg border border-black px-2 py-1 hover:border-emerald-600 hover:text-emerald-600">
            Admin
          </p>
        </Link>
        <form
          onSubmit={handleSubmit(addProduct)}
          className="m-4 flex w-2/4 flex-col justify-center gap-4"
        >
          <label htmlFor="name">Name</label>
          <input
            className="border-2 p-1"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <label htmlFor="price">Price</label>
          <input
            className="border-2 p-1"
            type="number"
            {...register("price", {
              required: true,
              min: 10000,
              max: 1000000,
              valueAsNumber: true,
            })}
          />
          {errors.price && <span>This field is required</span>}
          <label htmlFor="stock">Stock</label>
          <input
            className="border-2 p-1"
            type="number"
            {...register("stock", {
              required: true,
              min: 1,
              max: 100,
              valueAsNumber: true,
            })}
          />
          {errors.stock && <span>This field is required</span>}
          <button className="w-32 rounded-md bg-slate-300  p-2" type="submit">
            Submit
          </button>
        </form>
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
      </main>
    </>
  );
};

export default AddProduct;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (session?.user?.role !== role.admin) {
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
