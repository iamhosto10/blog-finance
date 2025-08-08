import { urlFor } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ILatestNewsCard {
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
}

const LatestNewsCard = (props: ILatestNewsCard) => {
  const { title, excerpt, image, slug } = props;
  return (
    <Link
      href={`/blog/${slug?.current}`}
      className="w-full flex flex-col h-full justify-between gap-1"
    >
      <h2 className="text-lg line-clamp-2 text-tertiary font-agrandir font-bold">
        {title}
      </h2>
      <img
        src={urlFor(image).url()}
        alt="image"
        height={500}
        className="rounded-lg object-cover w-full h-52 xl:h-72"
      />
      <p className="line-clamp-4 text-sm mt-2 text-tertiary font-canva-sans">
        {excerpt}
      </p>
    </Link>
  );
};

export default LatestNewsCard;
