"use client";

import { urlFor } from "@/lib/sanity";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Tag from "@/components/CommonComponents/Tag";

const ArticleHome = ({ category = "1" }: { category?: string }) => {
  const { blogs } = useSelector((state: RootState) => state.sanity);
  if (!blogs[0]) {
    return <div className="w-full lg:w-2/3"></div>;
  }

  const newBlogs =
    category === "1"
      ? blogs
      : blogs.filter((blog) =>
          blog.categories?.some(
            (cat) => cat.title.toLowerCase() === category.toLowerCase()
          )
        );

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
  } = newBlogs[Math.floor(Math.random() * newBlogs.length)];

  const categoryUrl = (categories && categories[0].slug?.current) ?? "";

  return (
    <div className="flex flex-col gap-4 w-full ">
      <h2 className="font-agrandir font-bold text-2xl lg:text-3xl text-secondary text-left line-clamp-4 lg:line-clamp-3 ">
        {title}
        <span className="text-primary"> {focusTitle} </span>
        {continueTitle}
      </h2>
      <div className="flex flex-row w-full justify-start gap-2">
        <Link href={"/" + categoryUrl}>
          <Tag title={categories && categories[0]?.title} />
        </Link>
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
            className="rounded-md w-full object-cover"
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
        className="rounded-full cursor-pointer self-end items-center hover:scale-115 transition-all"
        asChild
      >
        <Link
          href={`/${blogs[0]?.categories ? blogs[0]?.categories[0]?.slug.current : ""}/${slug?.current}`}
        >
          <p className="text-shadow-lg  text-shadow-black/20 font-agrandir font-bold ">
            Leer mas {">>"}
          </p>
        </Link>
      </Button>
    </div>
  );
};

export default ArticleHome;
