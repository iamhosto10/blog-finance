import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import LayoutHome from "../components/LayoutHome";
import { ReduxProvider } from "@/store/provider";
import Footer from "../components/Footer/footer";
import { client } from "@/lib/sanity";
import {
  banksQuery,
  blogsQuery,
  cardsQuery,
  categoriesQuery,
  dolarQuery,
  franchieseQuery,
  profitabilityQuery,
} from "@/lib/queries";
import CookieBanner from "@/components/CommonComponents/CookieBanner";
import Script from "next/script";
import GaListener from "./ga-listener";
import { Suspense } from "react";

export const revalidate = 60 * 60 * 24;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monopolombiano",
  description: "Blog para finanzas colombianas",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blogs, categories, dolar, profitability, banks, franchieses, cards] =
    await Promise.all([
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
      client.fetch(
        banksQuery,
        {},
        { next: { revalidate: 60 * 60 * 24, tags: ["global-data"] } }
      ),
      client.fetch(
        franchieseQuery,
        {},
        { next: { revalidate: 60 * 60 * 24, tags: ["global-data"] } }
      ),
      client.fetch(
        cardsQuery,
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
      banks,
      franchieses,
      cards,
      loading: false,
      error: null,
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body className={`${inter.className} bg-layout`}>
        <ReduxProvider preloadedState={preloadedState}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutHome>
              <Suspense fallback={null}>
                <GaListener />
              </Suspense>
              {children}
            </LayoutHome>
            <CookieBanner />
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
