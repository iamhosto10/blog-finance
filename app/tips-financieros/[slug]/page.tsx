import { Blog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { Metadata } from "next";
import BlogArticle from "./Clientpage";

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
    title,
    focusTitle,
    continueTitle,
    slug,
    publishedAt,
    mainImage,
    miniatureImage,
    excerpt,
    audio,
    body,
    categories[]->{
      _id,
      title,
      slug
    },
    relatedNews[]->{
      _id,
      title,
      focusTitle,
      continueTitle,
      slug,
      mainImage,
      excerpt,
      publishedAt
    }
  }`,
    { slug }
  );
}

// Generar metadata dinámico
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post: Blog = await getPost(slug);

  if (!post) {
    return {
      title: "Blog not found",
      description: "This blog post does not exist.",
    };
  }

  const title = [post?.title, post?.focusTitle, post?.continueTitle]
    .filter(Boolean)
    .join(" ");

  const formatedTitle =
    title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

  const ogImageUrl = post?.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : "https://monopolombiano.com/favicon.ico";

  return {
    title: formatedTitle,

    description: post.excerpt,
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: formatedTitle,

      description: post.excerpt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: formatedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: formatedTitle,

      description: post.excerpt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: formatedTitle,
        },
      ],
    },
  };
}

const Page = () => {
  return <BlogArticle />;
};

export default Page;
