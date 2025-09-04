"use client";

import { urlFor } from "@/lib/sanity";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function ArticleShowcase() {
  const { blogs } = useSelector((state: RootState) => state.sanity);

  if (!blogs[0]) {
    return <div className="w-full lg:w-2/3"></div>;
  }

  const titleComplete = [
    blogs[0].title,
    blogs[0].focusTitle,
    blogs[0].continueTitle,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="w-full grid gap-4 lg:grid-cols-12">
      {/* Artículo principal */}
      <Link
        href={`/${blogs[0]?.categories ? blogs[0]?.categories[0]?.slug.current : ""}/${blogs[0].slug?.current}`}
        className="lg:col-span-5 hover:scale-110 transition-all"
      >
        <div className="">
          <div className="relative w-full h-auto md:h-auto rounded-xl overflow-hidden">
            <img
              src={urlFor(blogs[0].mainImage).url()}
              alt={titleComplete}
              className="rounded-md w-full h-auto"
            />
          </div>
          <h2 className="mt-4 text-sm md:text-lg text-secondary font-agrandir font-bold text-left line-clamp-3 lg:line-clamp-2 ">
            {blogs[0].title}
            <span className="text-primary"> {blogs[0].focusTitle}</span>
            {blogs[0].continueTitle}
          </h2>
          {/* <p className="mt-2 text-sm text-secondary">
          {new Date(
            blogs[0].publishedAt ? blogs[0].publishedAt.slice(0, 10) : ""
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p> */}
          {blogs[0].excerpt && (
            <p className="mt-2 text-tertiary line-clamp-3 hidden lg:line-clamp-4">
              {blogs[0].excerpt}
            </p>
          )}
        </div>
      </Link>
      {/* Lista de artículos secundarios */}
      <div className="flex flex-col gap-6 lg:col-span-7">
        {blogs.slice(1, 4).map((article) => (
          <Link
            key={article._id}
            href={`/${article?.categories ? article?.categories[0]?.slug.current : ""}/${article.slug?.current}`}
            className="w-full flex flex-col justify-between gap-1 hover:scale-110 transition-all"
          >
            <div key={article._id} className="flex gap-2">
              <div className="rounded-lg w-2/5 overflow-hidden flex-shrink-0">
                <img
                  src={urlFor(article.mainImage).url()}
                  alt={
                    article.title +
                    " " +
                    article.focusTitle +
                    " " +
                    article.continueTitle
                  }
                  className="rounded-md w-auto"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-lg font-semibold leading-snug text-secondary">
                  {article.title}
                  <span className="text-primary"> {article.focusTitle} </span>
                  {article.continueTitle}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(
                    article.publishedAt ? article.publishedAt.slice(0, 10) : ""
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
