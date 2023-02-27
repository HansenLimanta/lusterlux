import { FC } from "react";

const TestimonyCard: FC = ({}) => {
  return (
    <div className="m-2 flex max-w-xl gap-8 overflow-hidden rounded-lg bg-slate-300 p-6 shadow-lg">
      <div className="flex items-center justify-center">video here</div>
      <div className="flex w-64 flex-col">
        <h2 className="text-2xl font-medium">Hansen Limanta</h2>
        <h3 className="text-md">@hansen_limanta</h3>
        <p className="pt-2 text-sm">
          I recently purchased a curl iron and I have been extremely happy with
          it. The curls it creates are so beautiful and natural-looking, and it
          heats up quickly so I can get started on my hair right away. Overall,
          I would highly recommend this curl iron to anyone looking to add some
          beautiful curls to their hair. It&apos;s definitely worth the
          investment!
        </p>
        <button className="mt-4 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
          Curl Iron Type 1, 32mm
        </button>
      </div>
    </div>
  );
};

export default TestimonyCard;
