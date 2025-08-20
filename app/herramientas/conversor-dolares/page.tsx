"use client";

import Tag from "@/components/CommonComponents/Tag";
import DolarConversor from "@/components/DolarConversor/DolarConversor";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/store/store";
import { DollarSignIcon, FlagIcon, MoveDown, MoveRight } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
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
            Convierte dólares estadounidenses (USD) a pesos colombianos (COP)
          </p>
        </section>
        <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
          <div className="h-auto flex md:block">
            <Tag title="HERRAMIENTAS" />
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
          <CardContent className="p-10">
            <DolarConversor dolar={dolar} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
