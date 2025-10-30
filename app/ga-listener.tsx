"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "@/lib/gtag";

export default function GaListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    pageview(url);
    console.log("url", url);
  }, [pathname, searchParams]);

  return null;
}
