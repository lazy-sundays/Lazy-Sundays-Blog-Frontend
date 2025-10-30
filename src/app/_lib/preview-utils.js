/**
 * Preview utilities for window-specific preview mode
 * These functions handle tab-isolated preview tokens using sessionStorage
 */

/**
 * Get the current preview status from sessionStorage
 * @returns {Object|null} Preview status with token and status, or null if not in preview
 */
export function getPreviewStatus() {
  // Only works on client side
  if (typeof window === "undefined") return null;

  const token = sessionStorage.getItem("preview_token");
  const status = sessionStorage.getItem("preview_status");

  return token && status ? { token, status } : null;
}

/**
 * Check if currently in preview mode (draft content)
 * @returns {boolean} True if in preview mode showing draft content
 */
export function isPreviewMode() {
  const preview = getPreviewStatus();
  return preview && preview.status !== "published";
}

/**
 * Check if preview tokens are present in URL search parameters
 * @param {Object|URLSearchParams} searchParams - URL search parameters (Next.js object or URLSearchParams)
 * @returns {Object|null} Preview data from URL or null
 */
export function getPreviewFromUrl(searchParams) {
  if (!searchParams) return null;

  // Handle both Next.js searchParams object and URLSearchParams
  const token =
    typeof searchParams.get === "function"
      ? searchParams.get("__preview_token")
      : searchParams["__preview_token"];

  const status =
    typeof searchParams.get === "function"
      ? searchParams.get("__preview_status")
      : searchParams["__preview_status"];

  return token && status ? { token, status } : null;
}

/**
 * Store preview tokens in sessionStorage
 * @param {string} token - Preview token
 * @param {string} status - Preview status (draft/published)
 */
export function storePreviewTokens(token, status) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("preview_token", token);
    sessionStorage.setItem("preview_status", status);
  }
}

/**
 * Clear preview mode tokens from sessionStorage
 */
export function clearPreviewMode() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("preview_token");
    sessionStorage.removeItem("preview_status");
  }
}

/**
 * Check if should fetch draft content based on preview tokens
 * Checks both URL parameters (for initial load) and sessionStorage (for subsequent requests)
 * @param {Object|URLSearchParams} searchParams - URL search parameters (optional)
 * @returns {boolean} True if should fetch draft content
 */
export function shouldFetchDraft(searchParams = null) {
  // Check URL parameters first (for initial server-side rendering)
  if (searchParams) {
    const urlPreview = getPreviewFromUrl(searchParams);
    if (urlPreview && urlPreview.status !== "published") {
      return true;
    }
  }

  // Check sessionStorage (for client-side requests)
  return isPreviewMode();
}
