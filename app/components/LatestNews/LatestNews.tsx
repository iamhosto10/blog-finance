import { Blog } from "@/app/lib/interface";
import React from "react";
import LatestNewsCard from "../Cards/LatestNewsCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const LatestNews = () => {
  const { blogs } = useSelector((state: RootState) => state.sanity);
  const data: Blog[] = blogs;
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h2 className="text-xl lg:text-2xl bg-primary text-background px-6 lg:px-10 py-2 lg:py-3 rounded-full mx-auto font-agrandir font-bold">
        Ultimas Noticias
      </h2>
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:w-2/3">
          {data.slice(0, 4).map((post, idx) => (
            <LatestNewsCard
              key={idx}
              excerpt={post.excerpt}
              image={post.mainImage}
              slug={post.slug}
              title={
                post.title +
                " " +
                (post?.focusTitle || "") +
                " " +
                (post?.continueTitle || "")
              }
            />
          ))}
        </div>
        <div className="w-1/3 h-96 bg-tertiary">
          <p className="text-5xl"> publicidad</p>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
