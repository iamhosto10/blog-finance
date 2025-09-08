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

  return {
    title: post.title + " " + post.focusTitle + " " + post.continueTitle,

    description: post.excerpt,
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: post.title + " " + post.focusTitle + " " + post.continueTitle,

      description: post.excerpt,
      images: [urlFor(post?.mainImage).url()],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title + " " + post.focusTitle + " " + post.continueTitle,

      description: post.excerpt,
      images: [urlFor(post?.mainImage).url()],
    },
  };
}

const Page = () => {
  return <BlogArticle />;
};

export default Page;
