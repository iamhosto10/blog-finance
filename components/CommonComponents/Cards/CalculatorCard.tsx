import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface CalculatorCardProps {
  rentability?: boolean;
  asset: string;
  label: string;
  interest?: string;
  description: string;
  href: string;
  buttonText: string;
}
const CalculatorCard = ({
  asset,
  buttonText,
  description,
  interest,
  href,
  label,
  rentability = false,
}: CalculatorCardProps) => {
  return (
    <div className="rounded-xl bg-tertiary-foreground  h-full flex flex-col">
      {rentability && (
        <img src={asset} alt={label} className="rounded-xl w-full h-auto" />
      )}
      <div className="p-6 text-center flex flex-col items-center justify-between gap-3 h-full">
        <div className="flex flex-col gap-2 items-center">
          {!rentability && (
            <img src={asset} alt={label} className="size-20 object-contain" />
          )}

          <h2 className="text-lg font-agrandir font-bold line-clamp-3 text-secondary h-14 lg:h-24 flex items-center">
            {label.toUpperCase()}
          </h2>
          {interest && (
            <h4 className="text-lg font-agrandir font-bold text-tertiary">
              {interest} %
            </h4>
          )}
          <p className="text-xs font-canva-sans text-tertiary whitespace-break-spaces text-left">
            {description}
          </p>
        </div>
        <Button
          variant={"primary"}
          className=" w-full rounded-lg cursor-pointer self-end items-center hover:scale-115 transition-all"
          asChild
        >
          <Link href={href}>
            <p className="text-shadow-lg text-shadow-black/20 font-agrandir font-bold ">
              {buttonText}
            </p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CalculatorCard;
