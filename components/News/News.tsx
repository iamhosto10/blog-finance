"use client";

import { Blog } from "@/lib/interface";
import React from "react";
import NewsCard from "../CommonComponents/Cards/NewsCard";
import AdInfeed from "../CommonComponents/Adsense/AdInfeed";
import AdNewsProducts from "../CommonComponents/Adsense/AdNewsProducts";
import { motion, Variants } from "framer-motion";

interface INewsProps {
  title?: string;
  data: Blog[];
}

// 1. Variantes para el contenedor (Orquestador de la cascada)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Tiempo entre la aparición de cada tarjeta individual
    },
  },
};

// 2. Variantes para cada tarjeta o anuncio individual
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const News = ({ data, title }: INewsProps) => {
  // Función de renderizado actualizada para incluir animación individual
  const renderPosts = (items: Blog[]) => {
    return items.map((post, idx) => (
      <motion.div key={post._id || idx} variants={itemVariants}>
        <NewsCard
          excerpt={post.excerpt}
          image={post.mainImage}
          slug={post.slug}
          title={post.title}
          focusTitle={post.focusTitle}
          continueTitle={post.continueTitle}
          mainCategory={post?.categories?.[0]?.slug.current ?? ""}
        />
      </motion.div>
    ));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col items-center w-full gap-4"
    >
      {/* Título de la sección */}
      {title && (
        <motion.h2
          variants={itemVariants}
          className="text-xl lg:text-2xl bg-primary-foreground text-background px-6 lg:px-10 py-2 lg:py-2 rounded-full mx-auto font-agrandir font-bold text-shadow-md text-shadow-black/20"
        >
          {title}
        </motion.h2>
      )}

      {/* Primera sección de contenido */}
      <div className="flex flex-col gap-10 w-full mt-5">
        {/* Desktop: Posts 1-3 */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:w-full">
          {data.length > 0 && renderPosts(data.slice(0, 3))}
        </div>

        {/* Desktop: Bloque de Anuncios (también animados uno a uno) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:w-full">
          {[0, 1, 2].map((index) => (
            <motion.div key={`ad-prod-${index}`} variants={itemVariants}>
              <AdNewsProducts />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Posts 1-2 */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {data.length > 0 && renderPosts(data.slice(0, 2))}
        </div>

        {/* Mobile: Ad Infeed */}
        <motion.div
          variants={itemVariants}
          className="lg:hidden grid grid-cols-1 gap-10 w-full"
        >
          <AdInfeed dataAdFormat={"fluid"} dataAdSlot={"9771876407"} />
        </motion.div>
      </div>

      {/* Segunda sección de contenido */}
      <div className="flex flex-col gap-10 w-full mt-5 mb-10">
        {/* Desktop: Posts 4-6 */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:w-full">
          {data.length > 0 && renderPosts(data.slice(3, 6))}
        </div>

        {/* Mobile: Posts 3-4 */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {data.length > 0 && renderPosts(data.slice(2, 4))}
        </div>
      </div>
    </motion.div>
  );
};

export default News;
