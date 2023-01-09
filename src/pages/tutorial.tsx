import { type NextPage } from "next";
import Meta from "../components/Meta";

const TutorialPage: NextPage = () => {
  return (
    <>
      <Meta />
      <main className="flex flex-col items-center">
        <h1 className="p-4 text-3xl">TUTORIAL PAGE</h1>
      </main>
    </>
  );
};

export default TutorialPage;
