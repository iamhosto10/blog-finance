import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import LayoutHome from "../components/LayoutHome";
import Footer from "../components/Footer/footer";
import CookieBanner from "@/components/CommonComponents/CookieBanner";
import Script from "next/script";
import GaListener from "./ga-listener";
import { Suspense } from "react";

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
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "Monopolombiano", url: "https://monopolombiano.com" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
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
        <meta
          name="google-adsense-account"
          content={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body className={`${inter.className} bg-layout`}>
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
      </body>
    </html>
  );
}
