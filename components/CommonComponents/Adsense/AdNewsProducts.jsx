"use client";

import React from "react";
import useAdSlot from "./useAdSlot";

const AdNewsProducts = () => {
  const [containerRef, visible] = useAdSlot();

  return (
    <div
      ref={containerRef}
      className="w-full max-w-full overflow-hidden aspect-square"
    >
      {visible && (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            aspectRatio: "1/1",
          }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot="5807638719"
        ></ins>
      )}
    </div>
  );
};

export default AdNewsProducts;
