"use client"

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import {BASEMAP} from "@deck.gl/carto"
import "maplibre-gl/dist/maplibre-gl.css";

export function InteractiveMap() {

    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;

        const map = new maplibregl.Map({
          container: mapContainer.current,
          style:
            BASEMAP.DARK_MATTER,
          interactive: true,
          center: [-119.4179, 36.7783],
          zoom: 6,
        });
        map.on('load', () => {
            console.log(map.getStyle());
        })
        mapRef.current = map;
        
        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        }
    }, []);

    return(
        <div ref={mapContainer} className="relative w-dvw h-dvh"/>
    )
}