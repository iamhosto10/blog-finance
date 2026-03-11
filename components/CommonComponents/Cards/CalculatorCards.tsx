"use client";

import React from "react";
import CalculatorCard from "./CalculatorCard";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {subcategories.map((subcategory, index) => (
        <motion.div key={subcategory.href || index} variants={cardVariants}>
          <CalculatorCard
            asset={subcategory.icon}
            buttonText={subcategory.buttonText}
            description={subcategory.description}
            href={subcategory.href}
            label={subcategory.label}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CalculatorCards;
