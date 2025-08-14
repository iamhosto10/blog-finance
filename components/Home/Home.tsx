"use client";

import LatestNews from "../LatestNews/LatestNews";
import ArticleHome from "../ArticleHome/ArticleHome";
import RecommendedTags from "../RecomendedTags/RecomendedTags";
import Simulators from "../Simulators/Simulators";

export default function Home() {
  return (
    <div>
      <LatestNews />
      <div className="flex flex-col lg:flex-row py-10 gap-8">
        <ArticleHome />
        <RecommendedTags />
      </div>
      <Simulators />
    </div>
  );
}
