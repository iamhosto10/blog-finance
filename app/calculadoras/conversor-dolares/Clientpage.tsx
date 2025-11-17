"use client";

import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import Tag from "@/components/CommonComponents/Tag";
import DolarConversor from "@/components/DolarConversor/DolarConversor";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const ClientPage = () => {
  const { dolar } = useSelector((state: RootState) => state.sanity);
  if (!dolar) return null;

  return (
    <div className="container md:-mt-6">
      <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
        <section className="text-center space-y-4 w-5/6 mx-auto">
          <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
            DOLARES AMERICANOS A{" "}
            <span className="text-primary">PESOS COLOMBIANOS</span>
          </h1>
          <p className="text-lg text-tertiary font-canva-sans">
            Con esta herramienta puedes convertir dólares estadounidenses (USD)
            a pesos colombianos (COP) en segundos, utilizando la tasa de cambio
            actual del mercado. Es ideal para conocer el valor real de tus
            compras, viajes o transacciones internacionales.
            <br />
            <br />
            Solo ingresa la cantidad en dólares que deseas convertir, y el
            conversor te mostrará cuántos pesos recibirías según el tipo de
            cambio del día. También puedes usarlo para comparar la tasa oficial
            con la ofrecida por bancos, casas de cambio o plataformas digitales.
            <br />
            <br />
            💡 Consejo: la tasa de cambio varía diariamente según el mercado y
            el precio del dólar en Colombia. Usa esta herramienta para
            mantenerte actualizado y tomar mejores decisiones financieras.
          </p>
        </section>
        <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
          <div className="h-auto flex md:block">
            <Link href="/calculadoras">
              <Tag title="CALCULADORAS" />
            </Link>
          </div>
          <img
            src="/assets/convertdolar/dolartopesos.webp"
            alt="4x1000"
            className="mx-auto max-w-5/6 md:max-w-3/6 lg:max-w-2/6"
          />
          <div className="h-auto hidden md:block ">
            <p className="text-sm lg:text-lg bg-background text-background px-2 py-1 rounded-full font-agrandir font-bold cursor-default">
              HERRAMIENTAS
            </p>
          </div>
        </div>

        <Card className="shadow-xl bg-tertiary-foreground">
          <CardContent className="p-3 md:p-5 lg:p-8">
            <DolarConversor dolar={dolar} />
          </CardContent>
        </Card>
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
      </div>
    </div>
  );
};

export default ClientPage;
