"use client";

import React from "react";
import useAdSlot from "./useAdSlot";

const AdInfeed = ({ dataAdSlot, dataAdFormat }) => {
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
          data-ad-format={dataAdFormat}
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={dataAdSlot}
        ></ins>
      )}
    </div>
  );
};

export default AdInfeed;
