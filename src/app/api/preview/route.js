import { redirect } from "next/navigation";
import { randomBytes } from "crypto";

export async function GET(request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const url = searchParams.get("url");
  const status = searchParams.get("status");

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Generate unique window token for tab-specific preview
  const windowToken = randomBytes(32).toString("hex");

  // Create preview URL with embedded token
  const previewUrl = new URL(url || "/", request.url);
  previewUrl.searchParams.set("__preview_token", windowToken);
  previewUrl.searchParams.set("__preview_status", status);

  // Redirect to content with token (maintains Strapi compliance)
  redirect(previewUrl.toString());
}
