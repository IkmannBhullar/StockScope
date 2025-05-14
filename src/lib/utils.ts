import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isUSMarketOpen() {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const weekday = now.getUTCDay(); // 0 = Sunday, 6 = Saturday

  const marketOpen = { hour: 13, minute: 30 }; // 9:30 AM ET
  const marketClose = { hour: 20, minute: 0 }; // 4:00 PM ET

  const isWeekday = weekday >= 1 && weekday <= 5;

  const afterOpen = utcHours > marketOpen.hour || (utcHours === marketOpen.hour && utcMinutes >= marketOpen.minute);
  const beforeClose = utcHours < marketClose.hour || (utcHours === marketClose.hour && utcMinutes < marketClose.minute);

  return isWeekday && afterOpen && beforeClose;
}