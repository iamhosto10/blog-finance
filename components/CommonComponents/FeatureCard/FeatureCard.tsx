import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IFeatureCard {
  url: string;
  title: string;
  subtitle: string;
}

const FeatureCard = ({ title, subtitle, url }: IFeatureCard) => {
  return (
    <Link href={url}>
      <div className="flex items-center justify-between border border-secondary rounded-xl px-4 py-3 gap-4 w-auto flex-shrink-0 bg-white shadow-sm  hover:scale-105 transition-all">
        <div className="flex items-center gap-3">
          {/* <Image src={item.icon} alt="icon" width={32} height={32} /> */}
          <div>
            <h2 className="font-semibold font-agrandir">{title}</h2>
            <p className="font-canva-sans text-xs sm:text-sm text-gray-600">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="bg-secondary p-2 rounded-full">
          <ChevronRight className="text-white" size={20} />
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
