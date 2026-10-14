"use client";

import { Blog } from "@/lib/interface";
import SanityImage from "@/components/CommonComponents/SanityImage";
import { formatPublishedDate } from "@/lib/date";
import dynamic from "next/dynamic";
import Tag from "@/components/CommonComponents/Tag";
import News from "@/components/News/News";
import { PortableText } from "@portabletext/react";
import { components } from "@/lib/utils";
import React from "react";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import AdInfeed from "@/components/CommonComponents/Adsense/AdInfeed";

// wavesurfer.js solo se descarga en los artículos que tienen audio.
const AudioPlayer = dynamic(
  () => import("@/components/MusicPlayer/MusicPlayer"),
  { ssr: false },
);

export default function BlogArticle({ post }: { post: Blog }) {
  const data = post;

  return (
    <div className="container md:-mt-6">
      <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl text-center">
        {data?.title} <span className="text-primary">{data?.focusTitle}</span>{" "}
        {data?.continueTitle}
      </h1>
      <div className="flex flex-row w-full justify-start gap-2 mt-4">
        <Tag title={data?.categories && data?.categories[0]?.title} />
        <p className="text-sm lg:text-lg text-tertiary my-auto font-canva-sans font-bold">
          {formatPublishedDate(data?.publishedAt)}
        </p>
      </div>

      <div className="relative w-full md:w-[70%] aspect-video mx-auto my-8">
        {data?.mainImage && (
          <div className="relative w-full mx-auto my-8 aspect-video overflow-hidden rounded-md">
            <SanityImage
              image={data.mainImage}
              alt={[data?.title, data?.focusTitle, data?.continueTitle]
                .filter(Boolean)
                .join(" ")}
              fill
              priority
              sizes="(min-width: 768px) 70vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        )}
        {data?.miniatureImage && (
          <div className="absolute -top-8 -right-8 md:-top-10 md:-right-10 size-20 md:size-28">
            <SanityImage
              image={data.miniatureImage}
              alt=""
              width={112}
              height={112}
              sizes="(min-width: 768px) 112px, 80px"
              className="size-20 md:size-28 object-cover"
            />
          </div>
        )}
      </div>

      {data?.audio?.asset.url && (
        <AudioPlayer audioUrl={data?.audio?.asset.url} />
      )}

      <div className="my-12 text-tertiary font-canva-sans text-sm lg:text-lg text-justify">
        {data?.body &&
          data.body.map((section, index) => (
            <React.Fragment key={index}>
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
                <div className="reveal relative w-full md:w-[70%] mx-auto my-8 aspect-video overflow-hidden rounded-md">
                  <SanityImage
                    image={section.asset}
                    alt={[data?.title, data?.focusTitle, data?.continueTitle]
                      .filter(Boolean)
                      .join(" ")}
                    fill
                    sizes="(min-width: 768px) 70vw, 100vw"
                    className="object-cover object-center"
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
