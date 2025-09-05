"use client";

import { urlFor } from "@/lib/sanity";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const ArticleShowcase = ({ category }: { category: string }) => {
  const { blogs } = useSelector((state: RootState) => state.sanity);

  if (!blogs[0]) {
    return <div className="w-full lg:w-2/3"></div>;
  }
  const newBlogs = blogs.filter((blog) =>
    blog.categories?.some(
      (cat) => cat.title.toLowerCase() === category.toLowerCase()
    )
  );

  console.log("blogs", blogs);

  if (newBlogs.length <= 0) return null;

  const titleComplete = [
    newBlogs[0]?.title,
    newBlogs[0]?.focusTitle,
    newBlogs[0]?.continueTitle,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="w-full grid gap-10 lg:grid-cols-12">
      {/* Artículo principal */}
      <Link
        href={`/${newBlogs[0]?.categories ? newBlogs[0]?.categories[0]?.slug.current : ""}/${newBlogs[0]?.slug?.current ?? " "}`}
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
            {newBlogs[0].title}
            <span className="text-primary"> {newBlogs[0].focusTitle} </span>
            {newBlogs[0].continueTitle}
          </h2>
          {newBlogs[0].excerpt && (
            <p className="mt-2 text-tertiary line-clamp-3 hidden lg:line-clamp-4">
              {newBlogs[0].excerpt}
            </p>
          )}
        </div>
      </Link>
      {/* Lista de artículos secundarios */}
      <div className="flex flex-col gap-6 lg:col-span-7">
        {newBlogs.slice(1, 4).map((article) => (
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
};

export default ArticleShowcase;
