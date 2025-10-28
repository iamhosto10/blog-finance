"use client";

import { urlFor } from "@/lib/sanity";
import { RootState } from "@/store/store";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const categories: Record<
  string,
  { title: string; items: { href: string; label: string }[] }
> = {
  "Tips Financieros": {
    title: "TIPS FINANCIEROS",
    items: [
      { href: "/Cajeros-y-bancos", label: "Cajeros y bancos" },
      { href: "/compras-y-ahorro-diario", label: "Compras y ahorro diario" },
      { href: "/seguridad-financiera", label: "Seguridad financiera" },
      {
        href: "/apps-y-herramientas-utiles",
        label: "Apps y herramientas útiles",
      },
      {
        href: "/manejo-del-dinero-en-el-extranjero",
        label: "Manejo del dinero en el extranjero",
      },
      { href: "/historial-crediticio", label: "Historial crediticio" },
    ],
  },
  "Economia Hoy": {
    title: "ECONOMÍA HOY",
    items: [
      { href: "/bancos-en-colombia", label: "Bancos en Colombia" },
      {
        href: "/cripto-y-nuevas-tecnologias",
        label: "Cripto y nuevas tecnologías",
      },
      { href: "/economía-del-pais", label: "Economía del país" },
      { href: "/regulaciones", label: "Regulaciones" },
      { href: "/tasas-de-interes", label: "Tasas de interés" },
      { href: "/impuestos", label: "Impuestos" },
    ],
  },
  "Finanzas Personales": {
    title: "FINANZAS PERSONALES",
    items: [
      { href: "/ahorro-y-presupuesto", label: "Ahorro y presupuesto" },
      { href: "/inversion", label: "Inversión" },
      { href: "/deudas-y-creditos", label: "Deudas y créditos" },
      { href: "/comprar-vivienda", label: "Comprar vivienda" },
    ],
  },
};

const ArticleList = ({
  category,
  indexes,
}: {
  category: string;
  indexes: number[];
}) => {
  const currentCategory = categories[category];

  console.log("Current Category", category, currentCategory);

  const { blogs } = useSelector((state: RootState) => state.sanity);

  if (!blogs[0]) {
    return <div className="w-full lg:w-2/3"></div>;
  }

  const newBlogs = blogs.filter((blog) =>
    blog.categories?.some(
      (cat) => cat.title.toLowerCase() === category.toLowerCase()
    )
  );

  if (newBlogs.length <= 0) return null;

  return (
    <>
      <section className="w-full grid gap-4 lg:grid-cols-12  rounded-3xl">
        <div
          className={
            "flex flex-col gap-6 " +
            (indexes[0] === 4 ? "lg:col-span-8" : "lg:col-span-12")
          }
        >
          {newBlogs
            .slice(indexes ? indexes[0] : 0, indexes ? indexes[1] : 6)
            .map((article) => (
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
                      className="rounded-md w-full object-cover"
                    />
                  </div>
                  <div>
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
        {currentCategory && (
          <div
            className={
              "bg-secondary-background rounded-lg " +
              (indexes[0] === 4 ? "lg:col-span-4" : "lg:col-span-0")
            }
          >
            <div className={indexes?.[0] === 4 ? "block" : "hidden"}>
              <h2 className="font-agrandir font-bold text-secondary text-xl pt-10 pb-5 text-center rounded-lg w-full bg-[#fbf7cc]">
                {currentCategory.title}
              </h2>

              <ul className="space-y-2 p-6">
                {currentCategory.items.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center">
                      <div className="w-5">
                        <ArrowRight
                          size={20}
                          className="text-secondary mr-1"
                          absoluteStrokeWidth
                          strokeWidth={3}
                        />
                      </div>
                      <span className="font-canva-sans text-tertiary line-clamp-2">
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ArticleList;
