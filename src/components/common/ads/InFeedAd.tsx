"use client";

import React from "react";
import { AdBanner } from "./AdBanner";

interface InFeedAdProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  className?: string;
}

export const InFeedAd: React.FC<InFeedAdProps> = ({
  dataAdSlot,
  dataAdFormat = "fluid",
  className = "",
}) => {
  return (
    <div className={`my-4 ${className}`}>
      <AdBanner
        dataAdSlot={dataAdSlot}
        dataAdFormat={dataAdFormat}
        dataFullWidthResponsive={true}
      />
    </div>
  );
};
