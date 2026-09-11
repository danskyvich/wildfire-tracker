"use client"

import { InteractiveMap } from "./components/map-instance";

export default function Home() {
  return (
    <div className="flex w-full h-full">
      <InteractiveMap/>

      {/* Floating container for UI */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-between">
        
      </div>
    </div>
  );
}
