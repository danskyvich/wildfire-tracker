"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { BASEMAP } from "@deck.gl/carto";
import "maplibre-gl/dist/maplibre-gl.css";
import { getUserLocation } from "../libs/location/geolocation";
import ErrorModal from "./ui/error-modal";

interface InteractiveMapProps {
  getLiftedMap: (map: maplibregl.Map) => void;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  const canvas = document.createElement("canvas");
  return !!(
    canvas.getContext("webgl2") ||
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")
  );
}

export default function InteractiveMap({getLiftedMap}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [webglSupported] = useState(checkWebGLSupport);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationEnabled, setLocationEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    // prompt the user to enable their location w/ consent
    const promptUserLocation = async () => {
      const result = await getUserLocation();
      if (!result.success) {
        setError(result.error);
        return;
      } else {
        setLocationEnabled(true);
        setLatitude(result.latitude);
        setLongitude(result.longitude);
      }
    };

    promptUserLocation();
  }, []);

  if (!webglSupported) {
    // throw during render -> caught by nearest error.tsx boundary
    throw new Error("WebGL is not available in this browser/environment.");
  }

  useEffect(() => {
    // use geojson to add a point above the map
    // this point is for the current user location
    const loadMap = (map: maplibregl.Map) =>
      new Promise<void>((resolve) =>
        map.on("load", () => {
          map.addSource("user_location", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [longitude ?? 121.05, latitude ?? 14.65],
                  },
                  properties: {
                    name: "Location",
                    type: "Point",
                  },
                },
              ],
            },
          });
          resolve();
        }),
      );

      // this function loads the basemap itself
    async function initMap() {
      if (!mapContainer.current || mapRef.current) return;

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: BASEMAP.DARK_MATTER,
        interactive: true,
        center: [longitude ?? 121.05, latitude ?? 14.65], //default to Quezon City
        zoom: 6,
      });

      const scale = new maplibregl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
      });

      map.addControl(scale, 'bottom-left')

      // wait for the point to load before adding it to basemap as a layer.
      await loadMap(map);

      getLiftedMap(map);

      if (locationEnabled) {
       map.addLayer({
         id: "user_location_point",
         type: "circle",
         source: "user_location",
         paint: {
           "circle-radius": 5,
           "circle-color": "#1971ff",
           "circle-stroke-width": 2,
           "circle-stroke-color": "#619eff",
         },
       }); 
      }

      // assign map to an element
      mapRef.current = map;
    }

    initMap();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, locationEnabled]);

  return (
    <>
      {error && <ErrorModal message={error} />}
      <div ref={mapContainer} id="map-canvas" className="relative w-dvw h-dvh" />
    </>
  );
}
