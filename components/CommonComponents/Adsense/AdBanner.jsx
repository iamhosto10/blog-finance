"use client";

import React, { useEffect } from "react";

const AdBanner = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    // <ins
    //   className="adsbygoogle max-w-[100%]"
    //   style={{ display: "block" }}
    //   data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
    //   data-ad-slot={dataAdSlot}
    //   data-ad-format={dataAdFormat}
    //   data-full-width-responsive={dataFullWidthResponsive.toString()}
    // ></ins>
    <div className="w-full max-w-screen-md mx-auto px-2 overflow-hidden">
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
    </div>
  );
};

export default AdBanner;
