"use client";

import React, { useState } from "react";
import { AdBanner } from "./AdBanner";

interface StickyAdProps {
  dataAdSlot: string;
  className?: string;
}

export const StickyAd: React.FC<StickyAdProps> = ({
  dataAdSlot,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 ${className}`}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-700"
        aria-label="Close ad"
      >
        ×
      </button>
      <div className="max-w-screen-xl mx-auto p-2">
        <AdBanner
          dataAdSlot={dataAdSlot}
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
        />
      </div>
    </div>
  );
};