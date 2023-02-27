import Image from "next/image";
import { FC } from "react";

type CardProps = {
  tags: string[];
  imgUrl: string;
};

const Card: FC<CardProps> = ({ tags, imgUrl }) => {
  return (
    <div className="max-w-sm cursor-pointer overflow-hidden rounded-lg shadow-lg ">
      <div className="relative h-96 w-full">
        <Image className="object-cover" fill alt="hair-potrait" src={imgUrl} />
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags.map((tag, index) => {
          return (
            <span
              key={index}
              className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
