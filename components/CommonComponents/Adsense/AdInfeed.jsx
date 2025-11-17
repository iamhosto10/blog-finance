"use client";

import React, { useEffect } from "react";

const AdInfeed = ({ dataAdSlot, dataAdFormat }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="w-full max-w-screen-md md:max-w-screen-xl mx-auto px-1 overflow-hidden">
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
    </div>
  );
};

export default AdInfeed;
