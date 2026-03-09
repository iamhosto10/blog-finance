import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Tag from "@/components/CommonComponents/Tag";
import { Blog } from "@/lib/interface";

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
    <div className="flex flex-col gap-4 w-full">
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
          {new Date(publishedAt?.slice(0, 10) || "").toLocaleDateString(
            "es-ES",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            },
          )}
        </p>
      </div>

      <div className="relative w-full md:w-4/5 mx-auto mt-8 aspect-video">
        {mainImage && (
          <Image
            src={urlFor(mainImage).url()}
            alt={`${title} ${focusTitle || ""} ${continueTitle || ""}`}
            fill // Usamos fill para que ocupe el contenedor relativo
            className="rounded-md object-cover"
          />
        )}
        {miniatureImage && (
          <div className="absolute -top-8 -right-8 md:-top-10 md:-right-10 w-20 h-20 md:w-28 md:h-28">
            <Image
              src={urlFor(miniatureImage).url()}
              alt="Miniature Image"
              fill
              className="object-contain" // Contain para no deformar el icono
            />
          </div>
        )}
      </div>

      <div className="font-canva-sans text-tertiary text-md text-justify line-clamp-6">
        <p>{excerpt}</p>
      </div>

      <Button
        className="rounded-full cursor-pointer self-end items-center hover:scale-115 transition-all"
        asChild
      >
        {/* Bug corregido: Ahora usa la categoría del propio blog, no del array global */}
        <Link href={`/${categoryUrl}/${slug?.current}`}>
          <p className="text-shadow-lg text-shadow-black/20 font-agrandir font-bold">
            Leer más {">>"}
          </p>
        </Link>
      </Button>
    </div>
  );
};

export default ArticleHome;
