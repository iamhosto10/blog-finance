"use client";

import { ReactSVG } from "react-svg";
const SocialMedia = () => {
  return (
    <div className="mx-16 px-6 py-8 flex flex-row flex-wrap items-end justify-end gap-2 max-w-full bg-background rounded-b-4xl">
      <p className="text-accent">Siguenos</p>
      <ReactSVG
        src="/assets/Layout/Facebook.svg"
        className="w-6 h-6 fill-accent"
      />
      <ReactSVG
        src="/assets/Layout/Instagram.svg"
        className="w-6 h-6 fill-accent"
      />
      <ReactSVG
        src="/assets/Layout/Youtube.svg"
        className="w-6 h-6 fill-accent"
      />
    </div>
  );
};

export default SocialMedia;
