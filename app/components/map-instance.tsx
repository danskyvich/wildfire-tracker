"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { BASEMAP } from "@deck.gl/carto";
import "maplibre-gl/dist/maplibre-gl.css";

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  const canvas = document.createElement("canvas");
  return !!(
    canvas.getContext("webgl2") ||
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")
  );
}

export function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [webglSupported] = useState(checkWebGLSupport);

  if (!webglSupported) {
    // throw during render -> caught by nearest error.tsx boundary
    throw new Error("WebGL is not available in this browser/environment.");
  }

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: BASEMAP.DARK_MATTER,
      interactive: true,
      center: [-119.4179, 36.7783],
      zoom: 6,
    });
    mapRef.current = map;

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={mapContainer} className="relative w-dvw h-dvh" />;
}
