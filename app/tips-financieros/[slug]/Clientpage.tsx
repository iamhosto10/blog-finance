"use client";

import { Blog } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import AudioPlayer from "@/components/MusicPlayer/MusicPlayer";
import Tag from "@/components/CommonComponents/Tag";
import News from "@/components/News/News";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { components, getPost } from "@/lib/utils";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import React from "react";
import AdInfeed from "@/components/CommonComponents/Adsense/AdInfeed";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: Blog = await getPost(params.slug);

  if (!post) {
    return {
      title: "Blog not found",
      description: "This blog post does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [urlFor(post?.mainImage).url()],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [urlFor(post?.mainImage).url()],
    },
  };
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useSelector((state: RootState) => state.sanity);
  if (blogs.length === 0) return <p>cargando...</p>;

  const data: Blog | undefined =
    blogs.find((blog) => blog.slug.current === slug) ||
    blogs.find((blog) => blog?.categories?.[0]?.title === "Tips Financieros");

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

      {data?.audio?.asset.url && (
        <AudioPlayer audioUrl={data?.audio?.asset.url} />
      )}

      <div className="my-12 text-tertiary font-canva-sans text-sm lg:text-lg text-justify w-full">
        {data?.body &&
          data.body.map((section, index) => (
            <React.Fragment key={"section-" + index}>
              {section.title && (
                <h2
                  key={section.title}
                  className="font-agrandir font-bold  text-secondary text-2xl mt-6 mb-2"
                >
                  {section.title}
                </h2>
              )}
              {section.body && (
                <PortableText value={section.body} components={components} />
              )}
              {section.table && (
                <div className="w-full my-6">
                  <table className="w-full border-collapse hidden md:table">
                    <tbody>
                      {section.table.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={
                            rowIndex % 2 === 0
                              ? "bg-primary-foreground"
                              : "bg-white"
                          }
                        >
                          {row.cells.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-tertiary px-4 py-2 text-sm lg:text-base"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="md:hidden space-y-5">
                    {section.table.rows.slice(1).map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="rounded-xl border border-tertiary bg-primary-foreground/50 p-4 shadow-sm"
                      >
                        <div className="grid grid-cols-1 gap-x-4 gap-y-3">
                          {row.cells.map((cell, cellIndex) => (
                            <div key={cellIndex} className="flex flex-col">
                              <span className="text-xs uppercase tracking-wide text-secondary font-bold">
                                {section.table?.rows[0]?.cells[cellIndex]}
                              </span>
                              <span className="mt-1 text-sm font-medium text-tertiary">
                                {cell}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              {index % 3 === 0 && (
                <>
                  <div className="w-full hidden md:block ">
                    <AdBanner
                      dataAdFormat="auto"
                      dataFullWidthResponsive={true}
                      dataAdSlot="7506188604"
                      key={"ads" + index}
                    />
                  </div>
                  <div className="w-full lg:hidden">
                    <AdInfeed
                      dataAdFormat={"fluid"}
                      dataAdSlot={"9771876407"}
                    />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
      </div>
      {data?.relatedNews && (
        <News title="Articulos relacionados" data={data?.relatedNews} />
      )}
    </div>
  );
}
