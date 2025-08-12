import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import LayoutHome from "./components/LayoutHome";
import { ReduxProvider } from "@/store/provider";
import Footer from "./components/Footer/footer";

export const revalidate = 60;

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
      <ReduxProvider>
        {/* Fondo de imagen aplicado en body */}
        <body className={`${inter.className} bg-layout`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutHome>{children}</LayoutHome>
            <Footer />
          </ThemeProvider>
        </body>
      </ReduxProvider>
    </html>
  );
}
