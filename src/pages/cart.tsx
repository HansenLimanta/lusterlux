import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Meta from "../components/Meta";

const CartPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <>
      <Meta />
      <main className="my-20 flex flex-col items-center">
        <h1 className="pt-4 text-3xl">Cart</h1>
      </main>
    </>
  );
};

export default CartPage;
