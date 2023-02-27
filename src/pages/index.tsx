import { GetServerSidePropsContext, type NextPage } from "next";
import FAQ from "../components/FAQ";
import Meta from "../components/Meta";
import TestimonyCarousel from "../components/TestimonyCarousel";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { role } from "../utils/constant";

const HomePage: NextPage = () => {
  return (
    <>
      <Meta />
      <main className="flex flex-col items-center">
        <h1 className="pt-4 text-3xl">HOME PAGE</h1>
        <TestimonyCarousel />
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
