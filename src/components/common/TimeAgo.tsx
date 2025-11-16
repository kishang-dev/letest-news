"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function TimeAgo({ date }: { date: string }) {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(date), { addSuffix: true })
    );

    // Optional: auto-update every minute
    const interval = setInterval(() => {
      setTimeAgo(
        formatDistanceToNow(new Date(date), { addSuffix: true })
      );
    }, 60_000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
      {timeAgo || "Just now"}
    </p>
  );
}
