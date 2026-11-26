import React from "react";
import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import JsonLd from "@/components/CommonComponents/JsonLd";
import SubcategoryConversionCta from "@/components/CommonComponents/SubcategoryConversionCta";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import type { ArticleSectionPath } from "@/lib/articleCta";
import type { Blog } from "@/lib/interface";
import { buildCollectionPageJsonLd, formatArticleTitle } from "@/lib/structuredData";

const SECTION_PARENTS: Record<
  ArticleSectionPath,
  { name: string; path: string }
> = {
  "economia-hoy": {
    name: "Economía Hoy",
    path: "/economia-hoy",
  },
  "finanzas-personales": {
    name: "Finanzas Personales",
    path: "/finanzas-personales",
  },
  "tips-financieros": {
    name: "Tips Financieros",
    path: "/tips-financieros",
  },
};

interface SubcategoryPageViewProps {
  title: string;
  description: string;
  sectionPath: ArticleSectionPath;
  subcategorySlug: string;
  categoryLabel: string;
  blogs: Blog[];
  intro: React.ReactNode;
}

export default function SubcategoryPageView({
  title,
  description,
  sectionPath,
  subcategorySlug,
  categoryLabel,
  blogs,
  intro,
}: SubcategoryPageViewProps) {
  const featuredBlog = blogs.length > 0 ? blogs[0] : undefined;
  const jsonLdItems = blogs
    .slice(0, 10)
    .filter((post) => Boolean(post.slug?.current))
    .map((post) => ({
      name: formatArticleTitle(post),
      url: `/${post.categories?.[0]?.slug?.current || sectionPath}/${post.slug.current}`,
      description: post.excerpt,
    }));

  return (
    <>
      <JsonLd
        data={buildCollectionPageJsonLd({
          name: title,
          description,
          path: `/${sectionPath}/${subcategorySlug}`,
          parent: SECTION_PARENTS[sectionPath],
          items: jsonLdItems,
        })}
      />
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          {title}
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          {intro}
        </p>

        <ArticleShowcase blogs={blogs} indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList blogs={blogs} category={categoryLabel} indexes={[4, 7]} />
        {featuredBlog && <ArticleHome blog={featuredBlog} />}
        <SubcategoryConversionCta
          sectionPath={sectionPath}
          subcategorySlug={subcategorySlug}
          subcategoryTitle={title}
        />
        <ArticleShowcase blogs={blogs} indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList blogs={blogs} category={categoryLabel} indexes={[11, 20]} />
      </div>
    </>
  );
}
