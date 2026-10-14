import Link from "next/link";
import { Button } from "@/components/ui/button";
import Tag from "@/components/CommonComponents/Tag";
import SanityImage from "@/components/CommonComponents/SanityImage";
import { Blog } from "@/lib/interface";
import { formatPublishedDate } from "@/lib/date";

const ArticleHome = ({ blog }: { blog: Blog }) => {
  if (!blog) {
    return <div className="w-full lg:w-2/3" />;
  }

  const {
    publishedAt,
    slug,
    title,
    continueTitle,
    focusTitle,
    mainImage,
    miniatureImage,
    categories,
    excerpt,
  } = blog;

  const categoryUrl = categories?.[0]?.slug?.current ?? "";

  return (
    <div className="reveal flex flex-col gap-4 w-full">
      <h2 className="font-agrandir font-bold text-2xl lg:text-3xl text-secondary text-left line-clamp-4 lg:line-clamp-3">
        {title}
        <span className="text-primary"> {focusTitle} </span>
        {continueTitle}
      </h2>
      <div className="flex flex-row w-full justify-start gap-2">
        <Link href={"/" + categoryUrl}>
          <Tag title={categories?.[0]?.title} />
        </Link>
        <p className="text-sm text-tertiary my-auto font-canva-sans font-bold">
          {formatPublishedDate(publishedAt)}
        </p>
      </div>
      <div className="relative w-full md:w-4/5 mx-auto mt-8 aspect-video">
        {mainImage && (
          <SanityImage
            image={mainImage}
            alt={[title, focusTitle, continueTitle].filter(Boolean).join(" ")}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-md object-cover"
          />
        )}
        {miniatureImage && (
          <div className="absolute -top-8 -right-8 md:-top-10 md:-right-10 w-20 h-20 md:w-28 md:h-28">
            <SanityImage
              image={miniatureImage}
              alt=""
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>
        )}
      </div>
      <div className="font-canva-sans text-tertiary text-md text-justify line-clamp-6">
        <p>{excerpt}</p>
      </div>

      <div className="self-end">
        <Button
          className="rounded-full cursor-pointer items-center hover:scale-115 transition-all duration-300"
          asChild
        >
          <Link href={`/${categoryUrl}/${slug?.current}`}>
            <p className="text-shadow-lg text-shadow-black/20 font-agrandir font-bold">
              Leer más {">>"}
            </p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ArticleHome;
