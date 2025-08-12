"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreloadedData } from "@/store/slices/sanitySlice";
import { RootState } from "@/store/store";
import LatestNews from "../LatestNews/LatestNews";
import ArticleHome from "../ArticleHome/ArticleHome";
import RecommendedTags from "../RecomendedTags/RecomendedTags";

export default function Home({ preloadedState }: { preloadedState: any }) {
  const dispatch = useDispatch();
  const { loading, blogs } = useSelector((state: RootState) => state.sanity);

  useEffect(() => {
    dispatch(setPreloadedData(preloadedState));
  }, [dispatch, preloadedState]);

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
          miniatureImage={blogs[0]?.miniatureImage}
          //@ts-expect-error: esta función rompe el tipado por que categories puede ser nulo motivo
          category={blogs[0]?.categories[0]?.title ?? ""}
        />
        <RecommendedTags />
      </div>
    </div>
  );
}
