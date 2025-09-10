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

// const components: PortableTextComponents = {
//   block: {
//     normal: ({ children }) => (
//       <>
//         <p className="whitespace-pre-line font-canva-sans text-tertiary">
//           {children}
//         </p>
//         <br />
//       </>
//     ),
//     h1: ({ children }) => (
//       <h1 className="text-3xl font-bold text-tertiary font-canva-sans my-4">
//         {children}
//       </h1>
//     ),
//     h2: ({ children }) => (
//       <h2 className="text-2xl font-semibold text-tertiary font-canva-sans my-3">
//         {children}
//       </h2>
//     ),
//     h3: ({ children }) => (
//       <h3 className="text-xl font-medium text-tertiary font-canva-sans my-2">
//         {children}
//       </h3>
//     ),
//     blockquote: ({ children }) => (
//       <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-700">
//         {children}
//       </blockquote>
//     ),
//   },
//   list: {
//     bullet: ({ children }) => (
//       <ul className="list-disc list-inside my-2">{children}</ul>
//     ),
//     number: ({ children }) => (
//       <ol className="list-decimal list-inside my-2 marker:font-bold">
//         {children}
//       </ol>
//     ),
//   },
//   listItem: {
//     bullet: ({ children }) => <li className="ml-4">{children}</li>,
//     number: ({ children }) => <li className="ml-4">{children}</li>,
//   },
//   marks: {
//     link: ({ value, children }) => {
//       const href = value?.href || "#";
//       const isExternal = href.startsWith("http");
//       return isExternal ? (
//         <a
//           href={href}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 underline hover:text-blue-800"
//         >
//           {children}
//         </a>
//       ) : (
//         <Link
//           href={href}
//           className="text-blue-600 underline hover:text-blue-800"
//         >
//           {children}
//         </Link>
//       );
//     },
//     strong: ({ children }) => (
//       <strong className="font-bold text-tertiary font-canva-sans">
//         {children}
//       </strong>
//     ),
//     em: ({ children }) => <em className="italic">{children}</em>,
//     underline: ({ children }) => <u>{children}</u>,
//     code: ({ children }) => (
//       <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded">
//         {children}
//       </code>
//     ),
//   },
// };

// Generar metadata dinámico

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
                <PortableText value={section.body} components={components} />
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
