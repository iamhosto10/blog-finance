"use client";

import { useState, useRef, useEffect } from "react";

export default function TextReaderWithControls({ text }: { text: string }) {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startReading = (startIndex = 0) => {
    if (!window.speechSynthesis) {
      alert("Tu navegador no soporta lectura en voz.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(startIndex));
    const voice = voices.find((v) => v.name === "Mónica");
    if (voice) utterance.voice = voice;
    utterance.lang = "es-ES";
    utterance.rate = 0.8;
    utterance.pitch = 0.7;

    utterance.onboundary = (event) => {
      if (event.name === "word" || event.charIndex >= 0) {
        const index = startIndex + event.charIndex;
        setCurrentCharIndex(index);
        setProgress((index / text.length) * 100);
      }
    };

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
      setProgress(100);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
    setIsPaused(false);
  };

  const pauseReading = () => {
    if (window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeReading = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const skip = (direction: "back" | "forward") => {
    let newIndex = currentCharIndex;
    if (direction === "back") {
      newIndex = Math.max(0, currentCharIndex - 50);
    } else {
      newIndex = Math.min(text.length - 1, currentCharIndex + 50);
    }
    startReading(newIndex);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    const newIndex = Math.floor((newProgress / 100) * text.length);
    setProgress(newProgress);
    startReading(newIndex);
  };

  return (
    <div className="p-4 max-w-lg border rounded bg-white shadow flex items-center">
      <svg
        onClick={() => skip("back")}
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 cursor-pointer"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M11 19V5l-7 7 7 7zm9 0V5l-7 7 7 7z" />
      </svg>

      {/* Play / Pause */}
      {!isReading ? (
        <svg
          onClick={() => startReading()}
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 cursor-pointer"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7-11-7z" />
        </svg>
      ) : isPaused ? (
        <svg
          onClick={resumeReading}
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 cursor-pointer"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7-11-7z" />
        </svg>
      ) : (
        <svg
          onClick={pauseReading}
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 cursor-pointer"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      )}

      {/* Adelantar */}
      <svg
        onClick={() => skip("forward")}
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 cursor-pointer"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13 5v14l7-7-7-7zm-9 0v14l7-7-7-7z" />
      </svg>

      {/* Barra de progreso */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        step="0.1"
        onChange={handleProgressChange}
        className="w-full accent-yellow-500"
      />
      {/* <p className="text-sm text-gray-600 mt-2">
        {Math.round(progress)}% leído
      </p> */}
    </div>
  );
}
