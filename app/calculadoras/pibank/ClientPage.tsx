"use client";

import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import BankAffiliateCta from "@/components/CommonComponents/BankAffiliateCta";
import BankCalculatorHero from "@/components/CommonComponents/BankCalculatorHero";
import { FAQ } from "@/components/CommonComponents/FAQ/FAQ";
import { InfoSection } from "@/components/CommonComponents/InfoSection/InfoSection";
import Profitability from "@/components/CommonComponents/Profitability/Profitability";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildBankPageCopy,
  formatSelectedRateLabel,
} from "@/lib/profitabilityCopy";
import { useState } from "react";

const Page = ({ profitabilityData }: { profitabilityData: number[] }) => {
  const [selected, setSelected] = useState(0);
  const { info, faq } = buildBankPageCopy("pibank", profitabilityData);

  return (
    <div className="p-6">
      <div className="container md:-mt-6">
        <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
          <section className="text-center space-y-4 w-5/6 mx-auto">
            <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
              CALCULADORA DE <span className="text-primary">RENTABILIDAD</span>{" "}
              DE PIBANK
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              {formatSelectedRateLabel(profitabilityData, selected)}
            </p>
          </section>
          <BankCalculatorHero
            logoSrc="/assets/pibank/pibank.png"
            logoAlt="Pibank Colombia"
            logoWidth={444}
            logoHeight={113}
            showCalculatorBadge={false}
          />

          <Card className="shadow-xl bg-tertiary-foreground">
            <CardContent className="p-3 md:p-5 lg:p-8">
              <Profitability
                profitability={profitabilityData}
                selected={selected}
                setSelected={setSelected}
              />
            </CardContent>
          </Card>
          <BankAffiliateCta bankKey="pibank" bankDisplayName="Pibank" />
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
