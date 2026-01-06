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
  title: {
    default:
      "Monopolombiano | Educación y Herramientas Financieras para Colombia",
    template: "%s | Monopolombiano",
  },
  description:
    "Monopolombiano te ofrece educación financiera, noticias económicas y herramientas interactivas para tomar mejores decisiones con tu dinero. Aprende sobre ahorro, inversión, crédito, impuestos, criptomonedas y más.",
  keywords: [
    "educación financiera",
    "finanzas personales",
    "bancos en Colombia",
    "calculadoras financieras",
    "simuladores financieros",
    "tasa de interés Colombia",
    "ahorro e inversión",
    "créditos y préstamos",
    "impuestos Colombia",
    "criptomonedas",
    "seguridad financiera",
    "historial crediticio",
    "economía hoy",
  ],
  metadataBase: new URL("https://monopolombiano.com"),
  openGraph: {
    title:
      "Monopolombiano | Educación y Herramientas Financieras para Colombia",
    description:
      "Explora artículos, calculadoras y noticias sobre finanzas personales, economía y ahorro. Aprende a manejar tu dinero con herramientas diseñadas para Colombia.",
    url: "https://monopolombiano.com",
    siteName: "Monopolombiano",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Monopolombiano - Educación y Herramientas Financieras",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Monopolombiano | Educación y Herramientas Financieras para Colombia",
    description:
      "Artículos, comparadores y calculadoras financieras para Colombia. Aprende a ahorrar, invertir y manejar tu dinero con Monopolombiano.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/",
  },
  authors: [{ name: "Monopolombiano", url: "https://monopolombiano.com" }],
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta
          name="google-adsense-account"
          content={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
        />
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
