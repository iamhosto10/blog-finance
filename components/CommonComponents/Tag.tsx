import React from "react";

const Tag = ({ title }: { title?: string }) => {
  return (
    <h3 className="text-sm lg:text-lg bg-primary-foreground text-background px-2 py-1 rounded-full font-agrandir font-bold text-shadow-lg  text-shadow-black/20">
      {title}
    </h3>
  );
};

export default Tag;
