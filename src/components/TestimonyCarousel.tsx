import { FC } from "react";
import TestimonyCard from "./TestimonyCard";

const TestimonyCarousel: FC = ({}) => {
  return (
    <div className="flex p-8">
      <TestimonyCard />
      <TestimonyCard />
      <TestimonyCard />
    </div>
  );
};

export default TestimonyCarousel;
