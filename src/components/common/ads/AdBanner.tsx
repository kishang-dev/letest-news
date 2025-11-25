// "use client";

// import React, { useEffect } from "react";

// interface AdBannerProps {
//   dataAdSlot: string;
//   dataAdFormat?: string;
//   dataFullWidthResponsive?: boolean;
//   className?: string;
//   style?: React.CSSProperties;
// }

// export const AdBanner: React.FC<AdBannerProps> = ({
//   dataAdSlot,
//   dataAdFormat = "auto",
//   dataFullWidthResponsive = true,
//   className = "",
//   style = { display: "block" },
// }) => {
//   useEffect(() => {
//     try {
//       if (typeof window !== "undefined") {
//         ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
//       }
//     } catch (err) {
//       console.error("AdSense error:", err);
//     }
//   }, []);

//   return (
//     <ins
//       className={`adsbygoogle ${className}`}
//       style={style}
//       data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
//       data-ad-slot={dataAdSlot}
//       data-ad-format={dataAdFormat}
//       data-full-width-responsive={dataFullWidthResponsive.toString()}
//     />
//   );
// };



"use client";

import React, { useEffect, useRef } from "react";

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
  className = "",
  style = { display: "block" },
}) => {
  const insRef = useRef<HTMLModElement>(null);
  const hasPushed = useRef(false);

  useEffect(() => {
    // Reset push guard when slot changes (different ad unit)
    if (!hasPushed.current) {
      hasPushed.current = true;

      try {
        if (typeof window !== "undefined" && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
        }
      } catch (err) {
        console.warn("AdSense push failed:", err);
      }
    }
  }, [dataAdSlot]); // Important: re-enable push only if slot changes

  // This key forces React to completely remount the <ins> when the slot changes
  // Prevents "already has ads" when navigating between pages with different slots
  const uniqueKey = `adsbygoogle-${dataAdSlot}`;

  return (
    <ins
      key={uniqueKey} // ← Critical fix
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    />
  );
};