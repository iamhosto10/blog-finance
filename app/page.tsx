"use client";

import LatestNews from "./components/LatestNews/LatestNews";
import RecommendedTags from "./components/RecomendedTags/RecomendedTags";
import ArticleHome from "./components/ArticleHome/ArticleHome";
import {
  fetchBlogs,
  fetchCategories,
  fetchDolar,
} from "@/store/slices/sanitySlice";
import { useEffect } from "react";
import { RootState, AppDispatch } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";

// export const revalidate = 30; // revalidate at most 30 seconds

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, blogs } = useSelector((state: RootState) => state.sanity);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchCategories());
    dispatch(fetchDolar());
  }, [dispatch]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <LatestNews />
      <div className="flex flex-col lg:flex-row py-10 gap-8">
        <ArticleHome
          body={blogs[0]?.body}
          publishedAt={blogs[0]?.publishedAt ?? ""}
          slug={blogs[0]?.slug.current ?? ""}
          title={blogs[0]?.title}
          continueTitle={blogs[0]?.continueTitle}
          focusTitle={blogs[0]?.focusTitle}
          mainImage={blogs[0]?.mainImage}
          //@ts-expect-error
          category={blogs[0]?.categories[0]?.title ?? ""}
        />
        <RecommendedTags />
      </div>
    </div>
  );
}
