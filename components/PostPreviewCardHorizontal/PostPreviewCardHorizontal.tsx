import React from "react";
import Tag from "../CommonComponents/Tag";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { urlFor } from "@/lib/sanity";

const PostPreviewCardHorizontal = () => {
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
    categories,
    excerpt,
  } = blogs[0];
  const titleComplete = [title, focusTitle, continueTitle]
    .filter(Boolean)
    .join(" ");
  return (
    <div className=" flex flex-col lg:flex-row gap-10 my-10">
      <img
        src={urlFor(mainImage).url()}
        alt={titleComplete}
        className="rounded-md w-full lg:w-2/5"
      />
      <div className="flex flex-col gap-4">
        <h2 className="font-agrandir font-bold text-xl text-secondary text-left line-clamp-3 lg:line-clamp-2 ">
          {title}
          <span className="text-primary"> {focusTitle}</span>
          {continueTitle}
        </h2>
        <div className="flex flex-row w-full justify-start gap-2">
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
        <div className="font-canva-sans text-tertiary text-md text-justify line-clamp-6">
          <p>{excerpt}</p>
        </div>

        <Button
          className="rounded-full cursor-pointer self-end items-center hover:scale-115 transition-all"
          asChild
        >
          <Link href={`/blog/${slug.current}`}>
            <p className="text-shadow-lg  text-shadow-black/20 font-agrandir font-bold ">
              Leer mas {">>"}
            </p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PostPreviewCardHorizontal;
