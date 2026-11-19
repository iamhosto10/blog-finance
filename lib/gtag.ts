export const GA_MEASUREMENT_ID: string = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const pageview = (url: string): void => {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID)
    return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const trackEvent = (
  action: string,
  params?: Record<string, string | number | boolean>,
): void => {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID)
    return;
  window.gtag("event", action, params);
};
