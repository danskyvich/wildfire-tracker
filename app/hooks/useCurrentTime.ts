import { useEffect, useState } from "react";

export function useCurrentTime() {

    const [time, setTime] = useState(() => new Date().toLocaleTimeString());
    const interval = 1000;
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, interval);

        return  () => clearInterval(timer);
    }, [interval]);

    const timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    return { time, timezone}
}