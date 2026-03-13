"use client";

import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { Blog } from "@/lib/interface";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full grid gap-10 lg:grid-cols-12"
    >
      <motion.div variants={itemVariants} className="lg:col-span-5">
        <Link
          href={`/${blogs[index1]?.categories ? blogs[index1]?.categories[0]?.slug.current : ""}/${blogs[index1]?.slug?.current ?? " "}`}
          className="block hover:scale-110 transition-all duration-300"
        >
          <div className="">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <img
                src={urlFor(blogs[index1].mainImage).url()}
                alt={titleComplete}
                className="absolute inset-0 w-full h-full rounded-md object-cover"
                loading="lazy"
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
      </motion.div>

      <div className="flex flex-col gap-6 lg:col-span-7">
        {blogs.slice(index1 + 1, index2).map((article, idx) => {
          if (!article) return null;
          return (
            <motion.div
              key={article._id || `article-${idx}`}
              variants={itemVariants}
            >
              <Link
                key={"article" + idx}
                href={`/${article?.categories ? article?.categories[0]?.slug.current : ""}/${article.slug?.current}`}
                className="w-full flex flex-col justify-between gap-1 hover:scale-110 transition-all duration-300"
              >
                <div key={article._id} className="flex gap-2">
                  <div className="relative rounded-lg w-2/5 aspect-video overflow-hidden flex-shrink-0">
                    <img
                      src={urlFor(article.mainImage).url()}
                      alt={`${article.title} ${article.focusTitle} ${article.continueTitle}`}
                      className="absolute inset-0 w-full h-full rounded-md object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-3/5">
                    <h3 className="text-sm md:text-lg font-semibold leading-snug text-secondary">
                      {article.title}
                      <span className="text-primary">
                        {" "}
                        {article.focusTitle}{" "}
                      </span>
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
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default ArticleShowcase;
