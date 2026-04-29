import { useEffect, useMemo, useState } from "react";

export type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(targetDate: string): CountdownValue {
  const distance = Math.max(0, new Date(targetDate).getTime() - Date.now());

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

export function useCountdown(targetDate: string): CountdownValue {
  const initialValue = useMemo(() => getRemaining(targetDate), [targetDate]);
  const [remaining, setRemaining] = useState<CountdownValue>(initialValue);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(targetDate));
    tick();

    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return remaining;
}
