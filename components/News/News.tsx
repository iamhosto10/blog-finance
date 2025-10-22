import { Blog } from "@/lib/interface";
import React from "react";
import NewsCard from "../CommonComponents/Cards/NewsCard";

interface INewsProps {
  title?: string;
  data: Blog[];
}

const News = ({ data, title }: INewsProps) => {
  const renderPosts = (items: Blog[]) => {
    return items.map((post, idx) => (
      <NewsCard
        key={idx}
        excerpt={post.excerpt}
        image={post.mainImage}
        slug={post.slug}
        title={post.title}
        focusTitle={post.focusTitle}
        continueTitle={post.continueTitle}
        mainCategory={post?.categories?.[0]?.slug.current ?? ""}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      {title && (
        <h2 className="text-xl lg:text-2xl bg-primary-foreground text-background px-6 lg:px-10 py-2 lg:py-2 rounded-full mx-auto font-agrandir font-bold text-shadow-md text-shadow-black/20">
          {title}
        </h2>
      )}

      <div className="flex flex-col gap-10 w-full mt-5">
        {/* Primera sección */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:w-full">
          {data.length && renderPosts(data.slice(0, 3))}
        </div>
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {data.length && renderPosts(data.slice(0, 2))}
        </div>

        {/* Publicidad */}
        {/* <div className="w-full h-40 bg-tertiary flex items-center justify-center">
          <p className="text-5xl">Publicidad</p>
        </div> */}
      </div>

      {/* Segunda sección */}
      <div className="flex flex-col gap-10 w-full mt-5 mb-10">
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:w-full">
          {data.length && renderPosts(data.slice(3, 6))}
        </div>
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {data.length && renderPosts(data.slice(2, 4))}
        </div>
      </div>
    </div>
  );
};

export default News;
