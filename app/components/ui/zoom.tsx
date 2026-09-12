import { Compass, Minus, Plus } from "lucide-react";

export function Zoom({map}: {map: maplibregl.Map | null}) {
  //check if the basemap exist
  if (!map) return null;

  // zoom in
  const zoomInMap = () => {
   map.zoomIn();
  };

  // zoom out
  const zoomOutMap = () => {
    map.zoomOut();
  };

  // align the map to the north automatically
  // by setting setBearing to 0
  const alignCompassNorth = () => {
    map.setBearing(0);
  };

  // map for zoom elements
  const ZOOM_BUTTONS = [
    {
      icon: <Plus size={15} className="min-w-4 h-auto cursor-pointer" />,
      className: "p-2 hover:rounded-l-lg",
      onClick: () => zoomInMap(),
    },
    {
      icon: <Minus size={15} className="min-w-4 h-auto cursor-pointer" />,
      className: "p-2",
      onClick: () => zoomOutMap(),
    },
    {
      icon: <Compass size={15} className="min-w-4 h-auto cursor-pointer" />,
      className: "p-2 hover:rounded-r-lg",
      onClick: () => alignCompassNorth(),
    },
  ];
  return (
    <div className="grid grid-cols-3 w-fit h-fit auto-cols-max bg-white rounded-md items-center justify-center pointer-events-auto">
      {ZOOM_BUTTONS.map((item, id) => (
        <div
          className={`${item.className} flex w-full h-full text-black hover:bg-slate-200 active:bg-slate-300 items-center justify-center`}
          key={id}
          onClick={item.onClick}
        >
          <p>{item.icon}</p>
        </div>
      ))}
    </div>
  );
}
