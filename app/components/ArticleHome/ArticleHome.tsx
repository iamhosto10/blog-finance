import { urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IProps {
  title: string;
  focusTitle?: string;
  continueTitle?: string;
  publishedAt: string;
  category: string;
  slug: string;
  body: Array<
    | {
        _type: "block";
        children: { text: string }[];
      }
    | {
        _type: "image";
        asset: {
          _ref: string;
        };
      }
  >;
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

const ArticleHome = ({
  body,
  publishedAt,
  slug,
  title,
  continueTitle,
  focusTitle,
  mainImage,
  category,
}: IProps) => {
  return (
    <div className="flex flex-col gap-4 w-full lg:w-2/3">
      <h2 className="font-agrandir font-bold text-2xl lg:text-3xl text-secondary text-left line-clamp-3 lg:line-clamp-2 ">
        {title}
        <span className="text-primary"> {focusTitle}</span>
        {continueTitle}
      </h2>
      <div className="flex flex-row w-full justify-start gap-2">
        <h3 className="text-sm lg:text-md bg-primary text-background px-2 py-1 rounded-full font-agrandir font-bold">
          {category}
        </h3>
        <p className="text-sm text-tertiary my-auto font-canva-sans font-bold">
          {new Date(publishedAt.slice(0, 10)).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="relative max-w-4/5 mx-auto p-6">
        {mainImage && (
          <img
            src={urlFor(mainImage).url()}
            alt={title + " " + (focusTitle || "") + " " + (continueTitle || "")}
            className="rounded-md"
          />
        )}
        <div className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 size-20 md:size-32">
          <img
            src="/assets/ArticleHome/icontest.png"
            alt="Ícono de banco"
            className="size-20 md:size-32"
          />
        </div>
      </div>
      <p className="font-canva-sans text-tertiary text-md text-justify line-clamp-6">
        <PortableText value={body} />
      </p>
      <Link href={`/blog/${slug}`} className="self-end cursor-pointer">
        <Button variant="outline">
          <p>leer mas {">>"} </p>
        </Button>
      </Link>
    </div>
  );
};

export default ArticleHome;
