"use client";

import React from "react";
import Slider from "../CommonComponents/Slider";
import Tag from "../CommonComponents/Tag";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const sliderVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Simulators = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-center justify-center w-full gap-4 lg:mt-10 lg:px-10"
    >
      <motion.h3
        variants={itemVariants}
        className="text-2xl font-bold font-agrandir text-secondary text-center"
      >
        USA NUESTROS <span className="text-primary"> SIMULADORES</span> PARA
        PROYECTAR TU FUTURO
      </motion.h3>

      <motion.div variants={itemVariants}>
        <Link href={"/calculadoras"}>
          <Tag title="CALCULADORAS" />
        </Link>
      </motion.div>

      <motion.div variants={sliderVariants} className="w-full">
        <Slider />
      </motion.div>
    </motion.div>
  );
};

export default Simulators;
