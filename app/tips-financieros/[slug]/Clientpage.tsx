"use client";

import { Blog } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import AudioPlayer from "@/components/MusicPlayer/MusicPlayer";
import Tag from "@/components/CommonComponents/Tag";
import News from "@/components/News/News";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useSelector((state: RootState) => state.sanity);
  if (blogs.length === 0) return <p>cargando...</p>;

  const data: Blog =
    blogs.find((blog) => blog.slug.current === slug) || blogs[0];

  console.log("Body", data);

  return (
    <div className="container md:-mt-6">
      <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl text-center">
        {data?.title} <span className="text-primary">{data?.focusTitle}</span>{" "}
        {data?.continueTitle}
      </h1>
      <div className="flex flex-row w-full justify-start gap-2 mt-4">
        <Tag title={data?.categories && data?.categories[0]?.title} />
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

      <div className="relative w-full md:w-[70%] mx-auto my-8">
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
            className="rounded-md w-full object-cover"
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
      {data?.audioUrl && <AudioPlayer audioUrl={data.audioUrl} />}

      <div className="my-12 text-tertiary font-canva-sans text-sm lg:text-lg text-justify">
        {data?.body &&
          data.body.map((section, index) => (
            <>
              {section.title && (
                <h2
                  key={section.title}
                  className="font-agrandir font-bold  text-secondary text-2xl mt-6 mb-2"
                >
                  {section.title}
                </h2>
              )}
              {section.body && (
                <p
                  key={index}
                  className="font-canva-sans text-tertiary mb-4 whitespace-pre-line"
                >
                  {section.body}
                </p>
              )}
              {section.asset && section.asset._type === "image" && (
                <div className="relative w-full md:w-[70%] mx-auto my-8">
                  <img
                    key={urlFor(section.asset).url()}
                    src={urlFor(section.asset).url()}
                    alt={
                      data?.title +
                      " " +
                      (data?.focusTitle || "") +
                      " " +
                      (data?.continueTitle || "")
                    }
                    className="w-full rounded-md"
                  />
                </div>
              )}
              {index % 2 === 0 && (
                <div className="h-40 w-full bg-tertiary">
                  <h3 className="text-3xl text-background">
                    Aqui iria a la publicidad
                  </h3>
                </div>
              )}
            </>
          ))}
      </div>
      {data.relatedNews && (
        <News title="Articulos relacionados" data={data?.relatedNews} />
      )}
    </div>
  );
}
