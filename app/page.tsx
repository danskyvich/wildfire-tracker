"use client"

import { InteractiveMap } from "./components/map-instance";
import Sidebar from "./components/ui/sidebar"
import SearchField from "./components/ui/search-field";
import { SearchIcon } from "lucide-react";
import { WebHeader } from "./components/ui/web-header";
import { Zoom } from "./components/ui/zoom";

export default function Home() {
  return (
    <div className="flex w-full h-full">
      <InteractiveMap />

      {/* Floating container for UI */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-between">
        <div className="absolute pointer-events-none grid grid-cols-[10%_1fr_10%] grid-rows-[5%_1fr_5%] w-full h-full p-3">

          {/* Row-1*/}
          <div className="flex flex-row col-span-3 row-span-1 row-start-1 items-center gap-5 justify-center">
            <div className="pointer-events-auto flex h-fit gap-2 items-center justify-end">
              <SearchIcon size={20} className="min-w-3 h-auto cursor-pointer" />
              <SearchField />
            </div>
            <WebHeader />
          </div>

          {/* Middle */}
          <div className="flex justify-start items-center">
            <Sidebar />
          </div>
          <div />
          <div />

          {/* Lower bar */}
          <div className="flex flex-col">
            <div className="flex w-fit h-fit border-x-2 border-b-2 bg-(--color-background-accent)/50 border-white/50 items-center px-2">
              <p className="text-sm">500 km</p>
            </div>
            <div className="flex w-fit h-fit border-x-2 border-b-2 bg-(--color-background-accent)/50 border-white/50 items-center px-2">
              <p className="text-sm">500 mi</p>
            </div>
          </div>

          <div />

          <div className="flex items-end justify-end pr-10 w-full h-full">
            <Zoom />
          </div>
        </div>
      </div>
    </div>
  );
}
