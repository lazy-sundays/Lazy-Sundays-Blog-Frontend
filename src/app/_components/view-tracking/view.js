"use client";

import { useEffect } from "react";

export default function ReportView({ id }) {
  useEffect(() => {
    if (!id) {
      console.warn("ReportView: No id provided");
      return;
    }

    // Skip API call in development
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.VERCEL_ENV !== "production"
    ) {
      console.log("ReportView: Skipping view increment in development");
      return;
    }

    fetch("/api/increment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error(
            "ReportView: Failed to increment view",
            response.status,
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("ReportView: Error incrementing view", error);
      });
  }, [id]);

  return null;
}
