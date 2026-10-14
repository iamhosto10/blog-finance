import Link from "next/link";
import React from "react";
import SanityImage from "../SanityImage";

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
        <div className="relative w-full h-48 xl:h-64">
          <SanityImage
            image={image}
            alt={[title, focusTitle, continueTitle].filter(Boolean).join(" ")}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="rounded-lg object-cover"
          />
        </div>
        <p className="line-clamp-5 text-sm  text-tertiary font-canva-sans text-justify ">
          {excerpt}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
