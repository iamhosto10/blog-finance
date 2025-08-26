// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import LayoutHome from "../components/LayoutHome";
import { ReduxProvider } from "@/store/provider";
import Footer from "../components/Footer/footer";
import { client } from "@/lib/sanity";
import {
  blogsQuery,
  categoriesQuery,
  dolarQuery,
  profitabilityQuery,
} from "@/lib/queries";

export const revalidate = 60 * 60 * 24;

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
  const [blogs, categories, dolar, profitability] = await Promise.all([
    client.fetch(
      blogsQuery,
      {},
      { next: { revalidate: 60 * 60 * 24, tags: ["global-data"] } }
    ),
    client.fetch(
      categoriesQuery,
      {},
      { next: { revalidate: 60 * 60 * 24, tags: ["global-data"] } }
    ),
    client.fetch(
      dolarQuery,
      {},
      { next: { revalidate: 60 * 60 * 24, tags: ["global-data"] } }
    ),
    client.fetch(
      profitabilityQuery,
      {},
      { next: { revalidate: 60 * 60 * 24, tags: ["global-data"] } }
    ),
  ]);

  const preloadedState = {
    sanity: {
      blogs,
      categories,
      dolar,
      profitability,
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
