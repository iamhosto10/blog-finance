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
      { href: "/comprar-vivistarta", label: "Comprar vivistarta" },
    ],
  },
};

const ArticleList = ({
  category,
  indexes,
}: {
  category: string;
  indexes?: number[];
}) => {
  const currentCategory =
    categories[category] || categories["Finanzas Personales"];

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

  return (
    <>
      <section className="w-full grid gap-4 lg:grid-cols-12  rounded-3xl">
        <div className="flex flex-col gap-6 lg:col-span-8">
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
                      className="rounded-md w-full"
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
        <div className="bg-secondary-background rounded-lg lg:col-span-4">
          <div className={indexes?.[0] === 0 ? "block" : "hidden"}>
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
        {/* <div className={" bg-secondary-background rounded-lg lg:col-span-4"}>
          {category === "Tips Financieros" ? (
            <>
              <h2 className="font-agrandir font-bold text-secondary text-xl pt-10 pb-5 text-center rounded-lg w-full bg-[#fbf7cc]">
                TIPS FINANCIEROS
              </h2>
              <ul className="space-y-2 p-6">
                <li>
                  <Link
                    href={"/Cajeros-y-bancos"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Cajeros y bancos
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/compras-y-ahorro-diario"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Compras y ahorro diario
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/seguridad-financiera"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Seguridad financiera
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/apps-y-herramientas-utiles"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Apps y herramientas útiles
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/manejo-del-dinero-en-el-extranjero"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Manejo del dinero en el extranjero
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/historial-crediticio"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Historial crediticio
                    </span>
                  </Link>
                </li>
              </ul>
            </>
          ) : category === "Economia Hoy" ? (
            <>
              <h2 className="font-agrandir font-bold text-secondary text-xl pt-10 pb-5 text-center rounded-lg w-full bg-[#fbf7cc]">
                ECONOMÍA HOY
              </h2>
              <ul className="space-y-2 p-6">
                <li>
                  <Link
                    href={"/bancos-en-colombia"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Bancos en Colombia
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/cripto-y-nuevas-tecnologias"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Cripto y nuevas tecnologías
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/economía-del-pais"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Economía del país
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={"/regulaciones"} className="flex items-center">
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Regulaciones
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/tasas-de-interes"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Tasas de interés
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={"/impuestos"} className="flex items-center">
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Impuestos
                    </span>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <h2 className="font-agrandir font-bold text-secondary text-xl pt-10 pb-5 text-center rounded-lg w-full bg-[#fbf7cc]">
                FINANZAS PERSONALES
              </h2>
              <ul className="space-y-2 p-6">
                <li>
                  <Link
                    href={"/ahorro-y-presupuesto"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Ahorro y presupuesto
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={"/inversion"} className="flex items-center">
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Inversión
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/deudas-y-creditos"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Deudas y créditos
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/comprar-vivistarta"}
                    className="flex items-center"
                  >
                    <div className="w-5">
                      <ArrowRight
                        size={20}
                        className="text-secondary mr-1"
                        absoluteStrokeWidth
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-canva-sans text-tertiary line-clamp-2">
                      Comprar vivistarta
                    </span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div> */}
      </section>
    </>
  );
};

export default ArticleList;
