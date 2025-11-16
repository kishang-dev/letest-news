"use client";

import React from "react";
import { AdBanner } from "./AdBanner";

interface VerticalAdProps {
  dataAdSlot: string;
  className?: string;
  height?: string;
  width?: string;
}

export const VerticalAd: React.FC<VerticalAdProps> = ({
  dataAdSlot,
  className = "",
  height = "600px",
  width = "160px",
}) => {
  return (
    <div className={`${className}`} style={{ width, minHeight: height }}>
      <AdBanner
        dataAdSlot={dataAdSlot}
        dataAdFormat="vertical"
        dataFullWidthResponsive={false}
        style={{
          display: "inline-block",
          width: width,
          height: height,
        }}
      />
    </div>
  );
};
