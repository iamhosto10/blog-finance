"use client";

import { useEffect, useRef, useState } from "react";

// adsbygoogle.push({}) rellena el siguiente <ins class="adsbygoogle"> vacío del
// documento, no uno concreto. Si existe un <ins> dentro de un contenedor oculto
// (versión solo-móvil o solo-desktop), AdSense intenta llenarlo con ancho 0 y
// lanza un error en consola. Por eso el <ins> solo se monta si el contenedor
// es visible, y recién entonces se hace el push.
export default function useAdSlot() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (containerRef.current && containerRef.current.offsetWidth > 0) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error.message);
    }
  }, [visible]);

  return [containerRef, visible];
}
