import React from "react";
import { IInfoProps } from "./InfoSection";

const Info = ({ title, description }: IInfoProps) => {
  return (
    <div className=" flex flex-col gap-5">
      <h2 className="text-2xl font-bold font-agrandir text-tertiary">
        {title}
      </h2>
      <p className="font-canva-sans text-tertiary text-justify whitespace-pre-line">
        {description}
      </p>
    </div>
  );
};

export default Info;
