import { GetServerSidePropsContext, type NextPage } from "next";
import Link from "next/link";
import FAQ from "../components/FAQ";
import Meta from "../components/Meta";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { role } from "../utils/constant";

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
        <FAQ />
      </main>
    </>
  );
};

export default HomePage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (session?.user?.role === role.admin) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
