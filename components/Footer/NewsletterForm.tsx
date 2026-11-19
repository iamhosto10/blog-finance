"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/gtag";

interface NewsletterFormProps {
  source?: string;
}

export default function NewsletterForm({
  source = "footer_newsletter",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage("¡Listo! Ya quedaste suscrito a Monopolombiano.");
        setEmail("");
        trackEvent("lead_signup", { source });
      } else {
        setStatus("error");
        setMessage(data.error || "No pudimos registrar tu correo.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-3 w-full max-w-md mx-auto md:mx-0"
      aria-label="Formulario de suscripción al boletín de Monopolombiano"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          disabled={status === "loading"}
          className="flex-1 rounded-full bg-background/15 border-2 border-background px-4 py-2 text-sm text-background placeholder:text-background/75 focus:outline-none focus:ring-2 focus:ring-background"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-2 border-background border-4 rounded-full font-semibold hover:bg-background hover:text-tertiary transition cursor-pointer disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "ENVIANDO..." : "SUSCRÍBETE"}
        </button>
      </div>
      {message && (
        <p
          role="status"
          className={`text-xs font-canva-sans ${
            status === "success" ? "text-background font-semibold" : "text-red-100"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
