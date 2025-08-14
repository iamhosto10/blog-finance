import { urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Blog } from "@/lib/interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Tag from "../CommonComponents/Tag";

const ArticleHome = () => {
  const { blogs } = useSelector((state: RootState) => state.sanity);
  if (!blogs[0]) {
    return <div className="w-full lg:w-2/3"></div>;
  }
  const {
    publishedAt,
    slug,
    title,
    continueTitle,
    focusTitle,
    mainImage,
    miniatureImage,
    categories,
    excerpt,
  } = blogs[0];
  return (
    <div className="flex flex-col gap-4 w-full lg:w-2/3">
      <h2 className="font-agrandir font-bold text-2xl lg:text-3xl text-secondary text-left line-clamp-3 lg:line-clamp-2 ">
        {title}
        <span className="text-primary"> {focusTitle}</span>
        {continueTitle}
      </h2>
      <div className="flex flex-row w-full justify-start gap-2">
        {/* <h3 className="text-sm lg:text-md bg-primary-foreground text-background px-2 py-1 rounded-full font-agrandir font-bold text-shadow-lg  text-shadow-black/20">
          {categories && categories[0]?.title}
        </h3> */}
        <Tag title={categories && categories[0]?.title} />
        <p className="text-sm text-tertiary my-auto font-canva-sans font-bold">
          {new Date(
            publishedAt ? publishedAt.slice(0, 10) : ""
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="relative w-full md:w-4/5 mx-auto mt-8">
        {mainImage && (
          <img
            src={urlFor(mainImage).url()}
            alt={title + " " + (focusTitle || "") + " " + (continueTitle || "")}
            className="rounded-md w-full"
          />
        )}
        {miniatureImage && (
          <div className="absolute -top-8 -right-8 md:-top-10 md:-right-10 size-20 md:size-28">
            <img
              src={urlFor(miniatureImage).url()}
              alt="Miniature Image"
              className="size-20 md:size-28"
            />
          </div>
        )}
      </div>
      <div className="font-canva-sans text-tertiary text-md text-justify line-clamp-6">
        <p>{excerpt}</p>
      </div>

      <Button
        className="rounded-full cursor-pointer self-end items-center"
        asChild
      >
        <Link href={`/blog/${slug.current}`}>
          <p className="text-shadow-lg  text-shadow-black/20 font-agrandir font-bold ">
            Leer mas {">>"}
          </p>
        </Link>
      </Button>
    </div>
  );
};

export default ArticleHome;
