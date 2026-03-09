import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/lib/interface";

const ArticleShowcase = ({
  indexes,
  blogs,
}: {
  indexes: number[];
  blogs: Blog[];
}) => {
  if (!blogs || blogs.length === 0) {
    return <div className="w-full lg:w-2/3"></div>;
  }

  const index1 = indexes[0];
  const index2 = indexes[1];

  if (!blogs[index1]) return null;

  const titleComplete = [
    blogs[index1]?.title,
    blogs[index1]?.focusTitle,
    blogs[index1]?.continueTitle,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="w-full grid gap-10 lg:grid-cols-12">
      {/* Artículo principal */}
      <Link
        href={`/${blogs[index1]?.categories ? blogs[index1]?.categories[0]?.slug.current : ""}/${blogs[index1]?.slug?.current ?? " "}`}
        className="lg:col-span-5 hover:scale-110 transition-all"
      >
        <div className="">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src={urlFor(blogs[index1].mainImage).url()}
              alt={titleComplete}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <h2 className="mt-4 text-sm md:text-lg text-secondary font-agrandir font-bold text-left line-clamp-3 lg:line-clamp-2 ">
            {blogs[index1].title}
            <span className="text-primary"> {blogs[index1].focusTitle} </span>
            {blogs[index1].continueTitle}
          </h2>
          {blogs[index1].excerpt && (
            <p className="mt-2 text-tertiary line-clamp-3 hidden lg:line-clamp-4">
              {blogs[index1].excerpt}
            </p>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-6 lg:col-span-7">
        {blogs.slice(index1 + 1, index2).map((article, idx) => {
          if (!article) return null;
          return (
            <Link
              key={"article" + idx}
              href={`/${article?.categories ? article?.categories[0]?.slug.current : ""}/${article.slug?.current}`}
              className="w-full flex flex-col justify-between gap-1 hover:scale-110 transition-all"
            >
              <div key={article._id} className="flex gap-2">
                <div className="relative rounded-lg w-2/5 aspect-video overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(article.mainImage).url()}
                    alt={`${article.title} ${article.focusTitle} ${article.continueTitle}`}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="w-3/5">
                  <h3 className="text-sm md:text-lg font-semibold leading-snug text-secondary">
                    {article.title}
                    <span className="text-primary"> {article.focusTitle} </span>
                    {article.continueTitle}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(
                      article.publishedAt
                        ? article.publishedAt.slice(0, 10)
                        : "",
                    ).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ArticleShowcase;
