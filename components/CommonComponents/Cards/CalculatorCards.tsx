import React from "react";
import CalculatorCard from "./CalculatorCard";

const CalculatorCards = ({
  subcategories,
}: {
  subcategories: {
    label: string;
    href: string;
    description: string;
    icon: string;
    buttonText: string;
  }[];
}) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {subcategories.map((subcategory, index) => (
        <div key={subcategory.href || index} className="reveal">
          <CalculatorCard
            asset={subcategory.icon}
            buttonText={subcategory.buttonText}
            description={subcategory.description}
            href={subcategory.href}
            label={subcategory.label}
          />
        </div>
      ))}
    </div>
  );
};

export default CalculatorCards;
