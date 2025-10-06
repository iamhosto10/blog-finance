import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import React from "react";

interface INewsCard {
  title?: string;
  focusTitle?: string;
  continueTitle?: string;
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  excerpt?: string;
  slug?: {
    current: string;
  };
  mainCategory: string;
}

const NewsCard = (props: INewsCard) => {
  const {
    title,
    focusTitle,
    continueTitle,
    excerpt,
    image,
    slug,
    mainCategory,
  } = props;
  return (
    <Link
      href={`/${mainCategory}/${slug?.current}`}
      className="w-full flex flex-col h-full gap-2 hover:scale-110 transition-all"
    >
      <h2 className="text-lg line-clamp-4 text-secondary font-agrandir font-bold">
        {title}
        <span className="text-primary"> {focusTitle} </span>
        {continueTitle}
      </h2>
      <div className="flex flex-col mt-auto gap-2">
        <img
          src={urlFor(image).url()}
          alt="image"
          height={500}
          className="rounded-lg object-cover w-full h-48 xl:h-64"
        />
        <p className="line-clamp-5 text-sm  text-tertiary font-canva-sans text-justify ">
          {excerpt}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
