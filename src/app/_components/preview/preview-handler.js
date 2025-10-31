"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  getPreviewFromUrl,
  storePreviewTokens,
} from "@/app/_lib/preview-utils";

/**
 * Preview Handler Component
 * Handles window-specific preview tokens for tab isolation.
 * Should be included in the root layout to process all preview requests.
 */
import { Suspense } from "react";

function PreviewHandlerInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if preview tokens are present in URL
    const previewData = getPreviewFromUrl(searchParams);

    if (previewData) {
      // Store tokens in sessionStorage (tab-specific)
      storePreviewTokens(previewData.token, previewData.status);

      // Clean URL by removing preview parameters without triggering navigation
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete("__preview_token");
      currentParams.delete("__preview_status");

      // Build clean URL
      const cleanSearch = currentParams.toString();
      const cleanPath = pathname + (cleanSearch ? "?" + cleanSearch : "");

      // Use window.history.replaceState to avoid triggering navigation that could cause 404
      window.history.replaceState({}, "", cleanPath);
    }
  }, [searchParams, router, pathname]);

  // This component doesn't render anything visible
  return null;
}

export default function PreviewHandler() {
  return (
    <Suspense fallback={null}>
      <PreviewHandlerInner />
    </Suspense>
  );
}
