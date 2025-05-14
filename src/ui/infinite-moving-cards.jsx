"use client";

import { cn } from "../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  function handleSaveToWatchlist(stock) {
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];
    const alreadySaved = existing.find((s) => s.title === stock.title);
  
    if (!alreadySaved) {
      const updated = [...existing, stock];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      alert(`✅ ${stock.title} added to watchlist`);
    } else {
      alert(`⚠️ ${stock.title} is already in your watchlist`);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
  className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
  key={item.name}
>
  <blockquote>
    <div
      aria-hidden="true"
      className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
    ></div>

    {/* Color-coded quote */}
    <span
      className={cn(
        "relative z-20 text-sm leading-[1.6] font-medium",
        item.quote.includes("-") ? "text-red-500" : "text-green-400"
      )}
    >
      {item.quote}
    </span>

    <div className="relative z-20 mt-6 flex flex-row items-center justify-between">
      <span className="flex flex-col gap-1">
        <span className="text-sm font-normal text-neutral-500 dark:text-gray-400">
          {item.name}
        </span>
        <span className="text-sm font-normal text-neutral-500 dark:text-gray-400">
          {item.title}
        </span>
      </span>

      {/* ✅ Save Button */}
      <button
        onClick={() => handleSaveToWatchlist(item)}
        className="ml-4 text-xs px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
      >
        +
      </button>
    </div>
  </blockquote>
</li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;