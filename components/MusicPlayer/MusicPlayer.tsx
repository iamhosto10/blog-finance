"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from "lucide-react";

export default function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    console.log("URL de audio desde Sanity:", audioUrl);

    // Destruir instancia previa
    wavesurfer.current?.destroy();

    // Crear Wavesurfer
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#9CA3AF",
      progressColor: "#EAB308",
      height: 60,
      barWidth: 3,
      cursorWidth: 0,
    });

    ws.load(audioUrl);

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));
    ws.on("error", (e) => console.error("Error cargando audio:", e));

    wavesurfer.current = ws;

    return () => {
      ws.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    wavesurfer.current?.playPause();
  };

  return (
    <div className="bg-gray-100 rounded-lg flex items-center p-4 gap-4">
      <Shuffle className="text-gray-400 cursor-pointer" size={20} />
      <SkipBack className="text-gray-400 cursor-pointer" size={24} />

      <Button
        size="icon"
        onClick={togglePlay}
        className="bg-yellow-500 hover:bg-yellow-400 rounded-full p-4"
      >
        {isPlaying ? (
          <Pause className="text-white" />
        ) : (
          <Play className="text-white" />
        )}
      </Button>

      <SkipForward className="text-gray-400 cursor-pointer" size={24} />
      <Repeat className="text-gray-400 cursor-pointer" size={20} />

      <div className="flex-1" ref={waveformRef}></div>
    </div>
  );
}
