import React from "react";
import Tag from "../CommonComponents/Tag";
import { Button } from "../ui/button";
import Link from "next/link";
import { Blog } from "@/lib/interface";
import { formatPublishedDate } from "@/lib/date";
import SanityImage from "../CommonComponents/SanityImage";

const PostPreviewCardHorizontal = ({ blog }: { blog: Blog }) => {
  if (!blog) {
    return <div className="w-full lg:w-2/3"></div>;
  }

  const { publishedAt, title, continueTitle, focusTitle, mainImage, categories, excerpt } =
    blog;

  const titleComplete = [title, focusTitle, continueTitle]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="reveal w-full hover:scale-115 transition-all duration-300">
      <Link
        href={`/${blog?.categories ? blog?.categories[0]?.slug.current : ""}/${blog.slug?.current}`}
        className="w-full block"
      >
        <div className="flex flex-col lg:flex-row gap-10 my-10">
          <div className="relative w-full lg:w-2/5 aspect-video shrink-0">
            <SanityImage
              image={mainImage}
              alt={titleComplete}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="rounded-md object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-agrandir font-bold text-xl text-secondary text-left line-clamp-4 lg:line-clamp-3">
              {title}
              <span className="text-primary"> {focusTitle} </span>
              {continueTitle}
            </h2>
            <div className="flex flex-row w-full justify-start gap-2">
              <Tag title={categories && categories[0]?.title} />
              <p className="text-sm text-tertiary my-auto font-canva-sans font-bold">
                {formatPublishedDate(publishedAt)}
              </p>
            </div>
            <div className="font-canva-sans text-tertiary text-md text-justify line-clamp-6">
              <p>{excerpt}</p>
            </div>

            <Button
              className="rounded-full cursor-pointer self-end items-center hover:scale-110 transition-all"
              asChild
            >
              <div className="text-shadow-lg text-shadow-black/20 font-agrandir font-bold">
                Leer mas {">>"}
              </div>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostPreviewCardHorizontal;
