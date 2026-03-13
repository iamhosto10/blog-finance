"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const backgroundVariants: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Header = () => {
  return (
    <div className="relative w-full h-[250px] md:h-[400px] lg:h-[600px] 2xl:h-[1000px] -mt-20 lg:top-[-60px] z-0 mb-10 overflow-hidden">
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="show"
        className="absolute inset-0 -z-10"
      >
        <img
          src="/assets/Header/headerBackground1.png"
          alt="Fondo Header"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
      </motion.div>

      <div className="relative flex flex-col justify-center items-center h-full lg:px-12">
        <motion.div
          variants={titleContainerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center -mt-10 md:-mt-20"
        >
          <motion.div
            variants={textItemVariants}
            className="relative w-auto group"
          >
            <div className="absolute inset-0 -z-10">
              <img
                src="/assets/Layout/Screen.png"
                alt="Background Screen"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>

            <h1 className="py-2 px-5 md:py-4 md:px-10 xl:py-6 xl:px-20 font-league-gothics font-bold text-white text-xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-9xl relative">
              EL BLOG PERFECTO
            </h1>
          </motion.div>
          <motion.h2
            variants={textItemVariants}
            className="bg-secondary py-1 px-6 md:py-2 md:px-16 xl:py-5 xl:px-28 font-league-gothics font-bold text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl"
          >
            PARA UNA VIDA FINANCIERA PRECISA
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
