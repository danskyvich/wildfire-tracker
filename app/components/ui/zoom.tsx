import { Compass, Minus, Plus } from "lucide-react"

export function Zoom() {

    const ZOOM_BUTTONS = [
      {
        icon: <Plus size={15} className="min-w-4 h-auto cursor-pointer" />,
        className: "p-2 hover:rounded-l-lg",
      },
      {
        icon: <Minus size={15} className="min-w-4 h-auto cursor-pointer" />,
        className: "p-2",
      },
      {
        icon: <Compass size={15} className="min-w-4 h-auto cursor-pointer" />,
        className: "p-2 hover:rounded-r-lg",
      },
    ];
    return (
      <div className="grid grid-cols-3 w-fit h-fit auto-cols-max bg-white rounded-md items-center justify-center pointer-events-auto">
        {ZOOM_BUTTONS.map((item, id) => (
          <div
            className={`${item.className} flex w-full h-full text-black hover:bg-slate-200 active:bg-slate-300 items-center justify-center`}
            key={id}
          >
            <p>{item.icon}</p>
          </div>
        ))}
      </div>
    );
}