// import { urlFor } from "@/lib/sanity";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { Blog } from "@/lib/interface";

// const categories: Record<
//   string,
//   { title: string; items: { href: string; label: string }[] }
// > = {
//   "Tips Financieros": {
//     title: "TIPS FINANCIEROS",
//     items: [
//       { href: "/tips-financieros/cajeros-y-bancos", label: "Cajeros y bancos" },
//       {
//         href: "/tips-financieros/compras-y-ahorro-diario",
//         label: "Compras y ahorro diario",
//       },
//       {
//         href: "/tips-financieros/seguridad-financiera",
//         label: "Seguridad financiera",
//       },
//       {
//         href: "/tips-financieros/apps-y-herramientas-utiles",
//         label: "Apps y herramientas útiles",
//       },
//       {
//         href: "/tips-financieros/manejo-del-dinero-en-el-extranjero",
//         label: "Manejo del dinero en el extranjero",
//       },
//       {
//         href: "/tips-financieros/historial-crediticio",
//         label: "Historial crediticio",
//       },
//     ],
//   },
//   "Economia Hoy": {
//     title: "ECONOMÍA HOY",
//     items: [
//       { href: "/economia-hoy/bancos-en-colombia", label: "Bancos en Colombia" },
//       {
//         href: "/economia-hoy/cripto-y-nuevas-tecnologias",
//         label: "Cripto y nuevas tecnologías",
//       },
//       { href: "/economia-hoy/economia-del-pais", label: "Economía del país" },
//       { href: "/economia-hoy/regulaciones", label: "Regulaciones" },
//       { href: "/economia-hoy/tasas-de-interes", label: "Tasas de interés" },
//       { href: "/economia-hoy/impuestos", label: "Impuestos" },
//     ],
//   },
//   "Finanzas Personales": {
//     title: "FINANZAS PERSONALES",
//     items: [
//       {
//         href: "/tips-financieros/ahorro-y-presupuesto",
//         label: "Ahorro y presupuesto",
//       },
//       { href: "/tips-financieros/inversion", label: "Inversión" },
//       {
//         href: "/tips-financieros/deudas-y-creditos",
//         label: "Deudas y créditos",
//       },
//       { href: "/tips-financieros/comprar-vivienda", label: "Comprar vivienda" },
//     ],
//   },
// };

// const ArticleList = ({
//   category,
//   indexes,
//   blogs,
// }: {
//   category: string;
//   indexes: number[];
//   blogs: Blog[];
// }) => {
//   const currentCategory = categories[category];

//   if (!blogs || blogs.length === 0) {
//     return <div className="w-full lg:w-2/3"></div>;
//   }

//   return (
//     <>
//       <section className="w-full grid gap-4 lg:grid-cols-12 rounded-3xl">
//         <div
//           className={
//             "flex flex-col gap-6 " +
//             (indexes[0] === 4 ? "lg:col-span-8" : "lg:col-span-12")
//           }
//         >
//           {blogs
//             .slice(indexes ? indexes[0] : 0, indexes ? indexes[1] : 6)
//             .map((article, index) => (
//               <Link
//                 key={article._id + "_" + index}
//                 href={`/${article?.categories ? article?.categories[0]?.slug.current : ""}/${article.slug?.current}`}
//                 className="w-full flex flex-col justify-between gap-1 hover:scale-110 transition-all"
//               >
//                 <div key={article._id} className="flex gap-2">
//                   <div className="relative rounded-lg w-2/5 aspect-video overflow-hidden flex-shrink-0">
//                     <img
//                       src={urlFor(article.mainImage).url()}
//                       alt={`${article.title} ${article.focusTitle || ""} ${article.continueTitle || ""}`}
//                       className="absolute inset-0 w-full h-full rounded-md object-cover"
//                       loading="lazy"
//                     />
//                   </div>

//                   <div className="w-3/5">
//                     <h3 className="text-sm md:text-lg font-semibold leading-snug text-secondary">
//                       {article.title}
//                       <span className="text-primary">
//                         {" "}
//                         {article.focusTitle}{" "}
//                       </span>
//                       {article.continueTitle}
//                     </h3>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {new Date(
//                         article.publishedAt
//                           ? article.publishedAt.slice(0, 10)
//                           : "",
//                       ).toLocaleDateString("es-ES", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//         </div>
//         {currentCategory && (
//           <div
//             className={
//               "bg-secondary-background rounded-lg " +
//               (indexes[0] === 4 ? "lg:col-span-4" : "lg:col-span-0")
//             }
//           >
//             <div className={indexes?.[0] === 4 ? "block" : "hidden"}>
//               <h2 className="font-agrandir font-bold text-secondary text-xl pt-10 pb-5 text-center rounded-lg w-full bg-[#fbf7cc]">
//                 {currentCategory.title}
//               </h2>

//               <ul className="space-y-2 p-6">
//                 {currentCategory.items.map(({ href, label }) => (
//                   <li key={href}>
//                     <Link href={href} className="flex items-center">
//                       <div className="w-5">
//                         <ArrowRight
//                           size={20}
//                           className="text-secondary mr-1"
//                           absoluteStrokeWidth
//                           strokeWidth={3}
//                         />
//                       </div>
//                       <span className="font-canva-sans text-tertiary line-clamp-2">
//                         {label}
//                       </span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// };

// export default ArticleList;

"use client";

import { urlFor } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Blog } from "@/lib/interface";
import { motion, Variants } from "framer-motion";

const categories: Record<
  string,
  { title: string; items: { href: string; label: string }[] }
> = {
  "Tips Financieros": {
    title: "TIPS FINANCIEROS",
    items: [
      { href: "/tips-financieros/cajeros-y-bancos", label: "Cajeros y bancos" },
      {
        href: "/tips-financieros/compras-y-ahorro-diario",
        label: "Compras y ahorro diario",
      },
      {
        href: "/tips-financieros/seguridad-financiera",
        label: "Seguridad financiera",
      },
      {
        href: "/tips-financieros/apps-y-herramientas-utiles",
        label: "Apps y herramientas útiles",
      },
      {
        href: "/tips-financieros/manejo-del-dinero-en-el-extranjero",
        label: "Manejo del dinero en el extranjero",
      },
      {
        href: "/tips-financieros/historial-crediticio",
        label: "Historial crediticio",
      },
    ],
  },
  "Economia Hoy": {
    title: "ECONOMÍA HOY",
    items: [
      { href: "/economia-hoy/bancos-en-colombia", label: "Bancos en Colombia" },
      {
        href: "/economia-hoy/cripto-y-nuevas-tecnologias",
        label: "Cripto y nuevas tecnologías",
      },
      { href: "/economia-hoy/economia-del-pais", label: "Economía del país" },
      { href: "/economia-hoy/regulaciones", label: "Regulaciones" },
      { href: "/economia-hoy/tasas-de-interes", label: "Tasas de interés" },
      { href: "/economia-hoy/impuestos", label: "Impuestos" },
    ],
  },
  "Finanzas Personales": {
    title: "FINANZAS PERSONALES",
    items: [
      {
        href: "/tips-financieros/ahorro-y-presupuesto",
        label: "Ahorro y presupuesto",
      },
      { href: "/tips-financieros/inversion", label: "Inversión" },
      {
        href: "/tips-financieros/deudas-y-creditos",
        label: "Deudas y créditos",
      },
      { href: "/tips-financieros/comprar-vivienda", label: "Comprar vivienda" },
    ],
  },
};

// Variantes de animación
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Los artículos aparecerán con 0.15s de diferencia
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 }, // Vienen un poco desde la izquierda
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ArticleList = ({
  category,
  indexes,
  blogs,
}: {
  category: string;
  indexes: number[];
  blogs: Blog[];
}) => {
  const currentCategory = categories[category];

  if (!blogs || blogs.length === 0) {
    return <div className="w-full lg:w-2/3"></div>;
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full grid gap-4 lg:grid-cols-12 rounded-3xl"
    >
      <div
        className={
          "flex flex-col gap-6 " +
          (indexes[0] === 4 ? "lg:col-span-8" : "lg:col-span-12")
        }
      >
        {blogs
          .slice(indexes ? indexes[0] : 0, indexes ? indexes[1] : 6)
          .map((article, index) => (
            <motion.div key={article._id + "_" + index} variants={itemVariants}>
              <Link
                href={`/${article?.categories ? article?.categories[0]?.slug.current : ""}/${article.slug?.current}`}
                className="w-full flex flex-col justify-between gap-1 hover:scale-105 transition-all duration-300"
              >
                <div className="flex gap-2">
                  <div className="relative rounded-lg w-2/5 aspect-video overflow-hidden flex-shrink-0">
                    <img
                      src={urlFor(article.mainImage).url()}
                      alt={`${article.title} ${article.focusTitle || ""} ${article.continueTitle || ""}`}
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
          ))}
      </div>

      {currentCategory && (
        <motion.div
          variants={itemVariants} // El menú lateral también entra en la secuencia
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
                  <Link href={href} className="flex items-center group">
                    <div className="w-5 transition-transform group-hover:translate-x-1">
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
        </motion.div>
      )}
    </motion.section>
  );
};

export default ArticleList;
