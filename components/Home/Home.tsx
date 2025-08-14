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
      <News title={"Ultimas noticias"} data={data} />
      <div className="flex flex-col lg:flex-row py-10 gap-8">
        <ArticleHome />
        <RecommendedTags />
      </div>
      <Simulators />
    </div>
  );
}
