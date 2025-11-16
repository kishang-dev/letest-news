"use client";

import React from "react";
import { AdBanner } from "./AdBanner";

interface InArticleAdProps {
  dataAdSlot: string;
  className?: string;
}

export const InArticleAd: React.FC<InArticleAdProps> = ({
  dataAdSlot,
  className = "",
}) => {
  return (
    <div className={`my-8 ${className}`}>
      <AdBanner
        dataAdSlot={dataAdSlot}
        dataAdFormat="fluid"
        dataFullWidthResponsive={true}
        style={{ display: "block", textAlign: "center" }}
      />
    </div>
  );
};
