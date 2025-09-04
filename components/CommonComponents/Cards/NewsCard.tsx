import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import React from "react";

interface INewsCard {
  title?: string;
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
  const { title, excerpt, image, slug, mainCategory } = props;
  return (
    <Link
      href={`/${mainCategory}/${slug?.current}`}
      className="w-full flex flex-col h-full justify-between gap-1 hover:scale-110 transition-all"
    >
      <h2 className="text-lg line-clamp-2 text-tertiary font-agrandir font-bold">
        {title}
      </h2>
      <img
        src={urlFor(image).url()}
        alt="image"
        height={500}
        className="rounded-lg object-cover w-full h-48 xl:h-64"
      />
      <p className="line-clamp-5 text-sm mt-2 text-tertiary font-canva-sans text-justify">
        {excerpt}
      </p>
    </Link>
  );
};

export default NewsCard;
