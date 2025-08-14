// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import LayoutHome from "../components/LayoutHome";
import { ReduxProvider } from "@/store/provider";
import Footer from "../components/Footer/footer";
import { client } from "@/lib/sanity";

export const revalidate = 60 * 30;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog de Finanzas v1",
  description: "Blog generado de prueba para probar todo de nextjs",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blogs, categories, dolar] = await Promise.all([
    client.fetch(
      `*[_type == "blog"]{
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
    title
  },
  relatedNews[]->{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt
  }
}| order(publishedAt desc)`,
      {},
      {
        cache: "no-cache",
        // next: { revalidate: 60 }, // fuerza a revalidar cada 60 seg
      }
    ),
    client.fetch(
      `*[_type == "category"]{ _id,title,slug }`,
      {},
      {
        cache: "no-cache",
        // next: { revalidate: 60 }, // fuerza a revalidar cada 60 seg
      }
    ),
    client.fetch(
      `*[_type == "dolar"] | order(fecha desc)[0]`,
      {},
      {
        cache: "no-cache",
        // next: { revalidate: 60 }, // fuerza a revalidar cada 60 seg
      }
    ),
  ]);

  const preloadedState = {
    sanity: {
      blogs,
      categories,
      dolar,
      loading: false,
      error: null,
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-layout`}>
        <ReduxProvider preloadedState={preloadedState}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutHome>{children}</LayoutHome>
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
