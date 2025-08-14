"use client";
import { useEffect, useRef } from "react";

// If you later host HLS (m3u8) yourself, add hls.js and load it here.
// For IA MP4 links, native playback is fine.

export default function Player({ src, captions }: { src: string; captions?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Autoplay policies vary; keep manual.
  }, []);

  return (
    <div className="panel p-0">
      <video ref={ref} controls playsInline className="w-full aspect-video">
        <source src={src} />
        {captions && <track kind="subtitles" srcLang="en" label="English" src={captions} default />}
      </video>
    </div>
  );
}
