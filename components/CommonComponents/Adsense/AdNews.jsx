"use client";

import React, { useEffect } from "react";

const AdNews = ({ dataAdSlot, dataAdFormat }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="w-full max-w-full overflow-hidden">
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
    </div>
  );
};

export default AdNews;
