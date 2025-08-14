"use client";

import News from "../News/News";
import ArticleHome from "../ArticleHome/ArticleHome";
import RecommendedTags from "../RecomendedTags/RecomendedTags";
import Simulators from "../Simulators/Simulators";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Blog } from "@/lib/interface";

export default function Home() {
  const { blogs } = useSelector((state: RootState) => state.sanity);
  const data: Blog[] = blogs;
  return (
    <div>
      {/* <div className="bg-tertiary-foreground w-full h-screen rounded-lg mb-6 lg:-mt-10 "></div> */}
      <News title={"Ultimas noticias"} data={data} />
      <div className="w-full shadow-2xl rounded-xl p-6 bg-tertiary-foreground my-6">
        <Simulators />
      </div>

      <div className="flex flex-col lg:flex-row py-10 gap-8">
        <ArticleHome />
        <RecommendedTags />
      </div>
    </div>
  );
}
