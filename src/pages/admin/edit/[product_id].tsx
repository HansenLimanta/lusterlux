import { type NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../../utils/trpc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";

type Inputs = {
  name: string;
  price: number;
  stock: number;
};

const EditProduct: NextPage = () => {
  const router = useRouter();
  const productId = router.query.product_id as string;
  const edit = trpc.products.editProduct.useMutation({
    onSuccess: () => {
      router.push("/admin");
    },
  });
  const { data: product, status } = trpc.products.getProduct.useQuery({
    id: productId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const editProduct: SubmitHandler<Inputs> = (data) => {
    edit.mutate({ id: productId, ...data });
  };

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Meta title={product?.name} />
      <main className="flex flex-col items-center">
        <h1 className="pt-4 text-3xl">Edit {product?.name}</h1>
        <Link href="/admin">
          <p className="m-4 rounded-lg border border-black px-2 py-1 hover:border-emerald-600 hover:text-emerald-600">
            Admin
          </p>
        </Link>
        <form
          onSubmit={handleSubmit(editProduct)}
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
        {edit.error && <p>Something went wrong! {edit.error.message}</p>}
      </main>
    </>
  );
};

export default EditProduct;
