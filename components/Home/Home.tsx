"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LatestNews from "../LatestNews/LatestNews";
import ArticleHome from "../ArticleHome/ArticleHome";
import RecommendedTags from "../RecomendedTags/RecomendedTags";

export default function Home() {
  const { blogs } = useSelector((state: RootState) => state.sanity);

  return (
    <div>
      <LatestNews />
      <div className="flex flex-col lg:flex-row py-10 gap-8">
        <ArticleHome />
        <RecommendedTags />
      </div>
    </div>
  );
}
