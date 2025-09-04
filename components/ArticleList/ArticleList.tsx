"use client";

import { urlFor } from "@/lib/sanity";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const ArticleList = () => {
  const { blogs } = useSelector((state: RootState) => state.sanity);

  if (!blogs[0]) {
    return <div className="w-full lg:w-2/3"></div>;
  }
  return (
    <>
      <section className="w-full grid gap-4 lg:grid-cols-12  rounded-3xl">
        <div className="flex flex-col gap-6 lg:col-span-9">
          {blogs.slice(0, 6).map((article) => (
            <Link
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
                    className="rounded-md w-full"
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
                      article.publishedAt
                        ? article.publishedAt.slice(0, 10)
                        : ""
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

        <div className="bg-secondary-foreground lg:col-span-3">
          <p className="text-2xl  w-full">
            aqui quiero poner las subcategorias Ahorro y presupuesto Inversión
            Deudas y créditos Comprar vivienda Finanzas en pareja Educación
            financiera y que se redirijan estoy pensando como
          </p>
        </div>
      </section>
    </>
  );
};

export default ArticleList;
