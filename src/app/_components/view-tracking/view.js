"use client";

import { useEffect } from "react";
import { isPreviewMode } from "@/app/_lib/preview-utils";

export default function ReportView({ id }) {
  useEffect(() => {
    if (!id) {
      console.warn("ReportView: No id provided");
      return;
    }

    // Skip incrementing views when in preview mode
    if (isPreviewMode()) {
      console.log("ReportView: Skipping view increment in preview mode");
      return;
    }

    // Always make the request - the API route handles production checks
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
