import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import SocialMedia from "./components/SocialMedia";
import LayoutHome from "./components/LayoutHome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog de Finanzas v1",
  description: "Blog generado de prueba para probar todo de nextjs",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Fondo de imagen aplicado en body */}
      <body className={`${inter.className} bg-layout`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutHome>{children}</LayoutHome>
          {/* <SocialMedia />
          <div className="my-6 mx-5 lg:my-10 lg:mx-16 bg-background rounded-4xl">
            <Navbar />
            <main className="max-w-2xl mx-auto px-4">{children}</main>
          </div> */}
          <div className="h-40 bg-background">
            <h1 className="text-3xl">
              Aqui ira el footer no te asustes solo lo dejo para guiarme
              visualmente
            </h1>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
