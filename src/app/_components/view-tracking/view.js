"use client";

import { useEffect } from "react";

export default function ReportView({ id }) {
  useEffect(() => {
    if (!id) {
      console.warn("ReportView: No id provided");
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
