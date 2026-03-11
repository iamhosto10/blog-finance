"use client";

import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Tag from "@/components/CommonComponents/Tag";
import { Blog } from "@/lib/interface";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ArticleHome = ({ blog }: { blog: Blog }) => {
  if (!blog) {
    return <div className="w-full lg:w-2/3" />;
  }

  const {
    publishedAt,
    slug,
    title,
    continueTitle,
    focusTitle,
    mainImage,
    miniatureImage,
    categories,
    excerpt,
  } = blog;

  const categoryUrl = categories?.[0]?.slug?.current ?? "";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col gap-4 w-full"
    >
      <motion.h2
        variants={itemVariants}
        className="font-agrandir font-bold text-2xl lg:text-3xl text-secondary text-left line-clamp-4 lg:line-clamp-3"
      >
        {title}
        <span className="text-primary"> {focusTitle} </span>
        {continueTitle}
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="flex flex-row w-full justify-start gap-2"
      >
        <Link href={"/" + categoryUrl}>
          <Tag title={categories?.[0]?.title} />
        </Link>
        <p className="text-sm text-tertiary my-auto font-canva-sans font-bold">
          {new Date(publishedAt?.slice(0, 10) || "").toLocaleDateString(
            "es-ES",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            },
          )}
        </p>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="relative w-full md:w-4/5 mx-auto mt-8 aspect-video"
      >
        {mainImage && (
          <Image
            src={urlFor(mainImage).url()}
            alt={`${title} ${focusTitle || ""} ${continueTitle || ""}`}
            fill
            className="rounded-md object-cover"
          />
        )}
        {miniatureImage && (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="absolute -top-8 -right-8 md:-top-10 md:-right-10 w-20 h-20 md:w-28 md:h-28"
          >
            <Image
              src={urlFor(miniatureImage).url()}
              alt="Miniature Image"
              fill
              className="object-contain"
            />
          </motion.div>
        )}
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="font-canva-sans text-tertiary text-md text-justify line-clamp-6"
      >
        <p>{excerpt}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="self-end">
        <Button
          className="rounded-full cursor-pointer items-center hover:scale-115 transition-all duration-300"
          asChild
        >
          <Link href={`/${categoryUrl}/${slug?.current}`}>
            <p className="text-shadow-lg text-shadow-black/20 font-agrandir font-bold">
              Leer más {">>"}
            </p>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ArticleHome;
