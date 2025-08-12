"use client";

import { Blog } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { RootState } from "@/store/store";
import { PortableText } from "@portabletext/react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import AudioPlayer from "@/components/MusicPlayer/MusicPlayer";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useSelector((state: RootState) => state.sanity);
  if (blogs.length === 0) return <p>cargando...</p>;

  const data: Blog =
    blogs.find((blog) => blog.slug.current === slug) || blogs[0];

  return (
    <>
      <h1 className="font-agrandir font-bold text-secondary text-3xl md:text-4xl">
        {data?.title} <span className="text-primary">{data?.focusTitle}</span>{" "}
        {data?.continueTitle}
      </h1>
      <div className="flex flex-row w-full justify-start gap-2 mt-4">
        <h3 className="text-sm lg:text-lg bg-primary text-background px-2 py-1 rounded-full font-agrandir font-bold">
          {data?.categories && data?.categories[0]?.title}
        </h3>
        <p className="text-sm lg:text-lg text-tertiary my-auto font-canva-sans font-bold">
          {new Date(
            data?.publishedAt ? data?.publishedAt?.slice(0, 10) : ""
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="relative w-full md:w-4/5 mx-auto mt-8">
        {data?.mainImage && (
          <img
            src={urlFor(data?.mainImage).url()}
            alt={
              data?.title +
              " " +
              (data?.focusTitle || "") +
              " " +
              (data?.continueTitle || "")
            }
            className="rounded-md w-full"
          />
        )}
        {data?.miniatureImage && (
          <div className="absolute -top-8 -right-8 md:-top-10 md:-right-10 size-20 md:size-28">
            <img
              src={urlFor(data?.miniatureImage).url()}
              alt="Miniature Image"
              className="size-20 md:size-28"
            />
          </div>
        )}
      </div>

      <div className="mt-12 text-tertiary font-canva-sans text-sm lg:text-lg text-justify mb-10">
        <PortableText value={data?.body} />
      </div>
      {data?.audioUrl && <AudioPlayer audioUrl={data.audioUrl} />}
    </>
  );
}
