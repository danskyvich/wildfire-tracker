import {Locate, Layers, Wind, Ruler, List, Info} from 'lucide-react'
import { useState } from 'react';

export default function Sidebar() {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toggle, setToggle] = useState<string | null>(null);

  const SIDEBAR_ITEMS = [
    {
      icon: <Locate size={25} className="min-w-3 h-auto cursor-pointer" />, toggle: "locate-me"
    },
    { 
      icon: <Layers size={25} className="min-w-3 h-auto cursor-pointer" />, toggle: "layers=modal"
    },
    {
      icon: <Wind size={25} className="min-w-3 h-auto cursor-pointer" />, toggle: "wind-overlay"
    },
    {
      icon: <Ruler size={25} className="min-w-3 h-auto cursor-pointer" />, toggle: "measure-distance"
    },
    {
      icon: <List size={25} className="min-w-3 h-auto cursor-pointer" />, toggle: "legend-modal"
    },
    {
      icon: <Info size={25} className="min-w-3 h-auto cursor-pointer" />, toggle: "web-app-modal"
    },
  ];
    return (
      <div className="pointer-events-auto flex flex-col bg-(--color-background-accent)/75 w-fit h-fit py-10 px-3 gap-8 rounded-lg">
        {
          SIDEBAR_ITEMS.map((item, id) => (
            <div className={`${activeIndex === id && "text-(--color-accent)"} flex w-full h-fit hover:bg-(--color-background-accent)/50 hover:text-(--color-accent)`} key={id} onClick={() => setActiveIndex(id)}>
              {item.icon}
            </div>
          ))
        }
      </div>
    );
}