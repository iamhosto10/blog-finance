"use client";

import React from "react";
import useAdSlot from "./useAdSlot";

const AdBanner = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {
  const [containerRef, visible] = useAdSlot();

  return (
    <div
      ref={containerRef}
      className="w-full max-w-screen-md md:max-w-screen-xl mx-auto px-1 overflow-hidden"
    >
      {visible && (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
          }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        ></ins>
      )}
    </div>
  );
};

export default AdBanner;
