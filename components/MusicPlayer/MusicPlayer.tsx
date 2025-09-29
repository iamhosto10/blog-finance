"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
} from "lucide-react";

export default function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (volume == 0) {
      setMute(true);
    } else {
      setMute(false);
    }
  }, [volume]);

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

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
    ws.setVolume(volume);

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    wavesurfer.current?.setVolume(newVolume);
  };

  return (
    <div className="bg-gray-100 rounded-lg flex items-center p-4 gap-2 w-full lg:w-[90%] mx-auto">
      {/* <Shuffle className="text-gray-400 cursor-pointer" size={20} /> */}
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
      {/* <Repeat className="text-gray-400 cursor-pointer" size={20} /> */}

      <div className="flex-1" ref={waveformRef}></div>

      <div className="relative group flex flex-col items-center">
        <div className="absolute bottom-8 flex flex-col items-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ">
          <div className="bg-gray-200 p-2 rounded-full">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className=" cursor-pointer accent-primary"
            />
          </div>
        </div>
        {mute ? (
          <VolumeOff
            className="text-yellow-500 cursor-pointer"
            size={28}
            onClick={() => {
              setMute(false);
              setVolume(0.1);
              wavesurfer.current?.setVolume(0.1);
            }}
          />
        ) : (
          <Volume2
            className="text-yellow-500 cursor-pointer"
            size={28}
            onClick={() => {
              setMute(true);
              setVolume(0);
              wavesurfer.current?.setVolume(0);
            }}
          />
        )}
      </div>
    </div>
  );
}
