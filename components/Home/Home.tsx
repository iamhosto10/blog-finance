// 1. ELIMINAMOS "use client" y Redux
import News from "../News/News";
import Simulators from "../Simulators/Simulators";
import ArticleHome from "./ArticleHome/ArticleHome";
import Header from "./Header/Header";
import IntroductionSection from "../IntroductionSection/IntroductionSection";
import PostPreviewCardHorizontal from "../PostPreviewCardHorizontal/PostPreviewCardHorizontal";
import CategoriesHome from "../CategoriesHome/CategoriesHome";
import AdInfeed from "../CommonComponents/Adsense/AdInfeed";

// 2. Importamos el cliente de Sanity y tus queries
import { client } from "@/lib/sanity";
import { blogsQuery } from "@/lib/queries"; // Asegúrate de que esta ruta sea la correcta

// 3. Convertimos el componente en asíncrono (async)
export default async function Home() {
  // 4. Hacemos el fetching directamente aquí en el servidor con ISR (caché)
  const data = await client.fetch(
    blogsQuery,
    {},
    { next: { tags: ["all-blogs", "global-data"] } },
  );

  const blogs = data || [];

  // 5. Lógica para el artículo aleatorio del <ArticleHome /> (del paso anterior)
  const randomBlog =
    blogs.length > 0 ? blogs[Math.floor(Math.random() * blogs.length)] : null;

  return (
    <>
      <Header />
      <div className="container">
        <IntroductionSection />
        <PostPreviewCardHorizontal />

        <News data={blogs.slice(1)} />

        <div className="w-full shadow-2xl rounded-xl p-6 bg-tertiary-foreground my-6">
          <Simulators />
        </div>

        <div className="mt-3 w-full">
          <AdInfeed dataAdFormat={"fluid"} dataAdSlot={"9771876407"} />
        </div>

        <div className="flex flex-col lg:flex-row py-10 gap-10">
          <div className="flex-[5]">
            {randomBlog && <ArticleHome blog={randomBlog} />}
          </div>
          <div className="flex-[2] w-full h-auto bg-secondary-background rounded-lg p-6">
            <CategoriesHome />
          </div>
        </div>
      </div>
    </>
  );
}
