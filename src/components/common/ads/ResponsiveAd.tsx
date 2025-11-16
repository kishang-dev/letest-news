"use client";

import React from "react";
import { AdBanner } from "./AdBanner";

interface ResponsiveAdProps {
  dataAdSlot: string;
  className?: string;
  minHeight?: string;
}

export const ResponsiveAd: React.FC<ResponsiveAdProps> = ({
  dataAdSlot,
  className = "",
  minHeight = "250px",
}) => {
  return (
    <div 
      className={`relative w-full ${className}`} 
      style={{ 
        minHeight,
        maxHeight: minHeight,
        overflow: "hidden"
      }}
    >
      <div className="absolute inset-0">
        <AdBanner
          dataAdSlot={dataAdSlot}
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
        />
      </div>
    </div>
  );
};