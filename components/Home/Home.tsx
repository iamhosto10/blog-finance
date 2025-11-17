"use client";

import News from "../News/News";
import Simulators from "../Simulators/Simulators";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Blog } from "@/lib/interface";
import ArticleHome from "./ArticleHome/ArticleHome";
import Header from "./Header/Header";
import IntroductionSection from "../IntroductionSection/IntroductionSection";
import PostPreviewCardHorizontal from "../PostPreviewCardHorizontal/PostPreviewCardHorizontal";
import CategoriesHome from "../CategoriesHome/CategoriesHome";
import AdInfeed from "../CommonComponents/Adsense/AdInfeed";

export default function Home() {
  const { blogs } = useSelector((state: RootState) => state.sanity);
  const data: Blog[] = blogs;
  return (
    <>
      <Header />
      <div className="container">
        <IntroductionSection />
        <PostPreviewCardHorizontal />
        <News data={data.slice(1)} />
        <div className="w-full shadow-2xl rounded-xl p-6 bg-tertiary-foreground my-6">
          <Simulators />
        </div>
        <AdInfeed dataAdFormat={"fluid"} dataAdSlot={"9771876407"} />
        <div className="flex flex-col lg:flex-row py-10 gap-10">
          <div className="flex-[5]">
            <ArticleHome />
          </div>
          <div className="flex-[2] w-full h-auto bg-secondary-background rounded-lg p-6">
            <CategoriesHome />
          </div>
        </div>
      </div>
    </>
  );
}
