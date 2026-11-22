"use client";

import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import BankAffiliateCta from "@/components/CommonComponents/BankAffiliateCta";
import { FAQ } from "@/components/CommonComponents/FAQ/FAQ";
import { InfoSection } from "@/components/CommonComponents/InfoSection/InfoSection";
import Profitability from "@/components/CommonComponents/Profitability/Profitability";
import Tag from "@/components/CommonComponents/Tag";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildBankPageCopy,
  formatSelectedRateLabel,
} from "@/lib/profitabilityCopy";
import { useState } from "react";

const Page = ({ profitabilityData }: { profitabilityData: number[] }) => {
  const [selected, setSelected] = useState(0);
  const { info, faq } = buildBankPageCopy("popular", profitabilityData);

  return (
    <div className="p-6">
      <div className="container md:-mt-6">
        <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
          <section className="text-center space-y-4 w-5/6 mx-auto">
            <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
              CALCULADORA DE <span className="text-primary">RENTABILIDAD</span>{" "}
              DE POPULAR
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              {formatSelectedRateLabel(profitabilityData, selected)}
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
              <img
                src="/assets/popular/popular.png"
                alt="popular"
                className="mx-auto w-full"
              />
            </div>
            <div className="h-auto hidden md:block ">
              <p className="text-sm lg:text-lg bg-background text-background px-2 py-1 rounded-full font-agrandir font-bold cursor-default">
                HERRAMIENTAS
              </p>
            </div>
          </div>

          <Card className="shadow-xl bg-tertiary-foreground">
            <CardContent className="p-3 md:p-5 lg:p-8">
              <Profitability
                profitability={profitabilityData}
                selected={selected}
                setSelected={setSelected}
              />
            </CardContent>
          </Card>
          <BankAffiliateCta bankKey="popular" bankDisplayName="Banco Popular" />
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="7506188604"
          />
          <InfoSection data={info} />

          <FAQ data={faq} />
        </div>
      </div>
    </div>
  );
};

export default Page;
