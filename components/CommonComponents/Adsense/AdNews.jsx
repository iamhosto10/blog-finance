"use client";

import React from "react";
import useAdSlot from "./useAdSlot";

const AdNews = ({ dataAdSlot, dataAdFormat }) => {
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
          data-ad-format={dataAdFormat}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={dataAdSlot}
          data-full-width-responsive="true"
        ></ins>
      )}
    </div>
  );
};

export default AdNews;
