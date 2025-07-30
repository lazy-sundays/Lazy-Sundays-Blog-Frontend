import { NextResponse } from "next/server";
import { ipAddress } from "@vercel/edge";
import { redis, isProduction } from "@/app/_lib/upstash-config";

export const runtime = "edge";

/**
 * adapted from https://upstash.com/blog/nextjs13-approuter-view-counter
 */
export async function POST(req) {
  // Skip Upstash logic in development or if Redis client is not available
  if (!isProduction || !redis) {
    return new NextResponse(null, { status: 202 });
  }

  try {
    const body = await req.json();
    const id = body.id;
    if (!id) {
      return new NextResponse("Slug not found", { status: 400 });
    }

    //if we can get a user's ip, check if duplicate request in 24 hrs
    const ip = ipAddress(req);
    if (ip) {
      // Hash the IP and turn it into a hex string
      const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(ip)
      );
      const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      //check if a specific ip address has been viewing a page within the last 24 hours
      const isNew = await redis.set(["deduplicate", hash, id].join(":"), true, {
        nx: true,
        ex: 24 * 60 * 60,
      });
      if (!isNew) {
        return new NextResponse(null, { status: 202 });
      }

      //this is a new entry within 24 hrs of the person's last view
      await redis.incr(["pageviews", "page", id].join(":"));
      return new NextResponse(null, { status: 202 });
    }

    //cut down on number of duplicate views on the whole site if no ip by using a cookie to check if a view has already been counted
    const viewedCookie = req.cookies.get(`hasViewed`);
    if (viewedCookie) {
      //this is not a new entry within 24 hrs
      if (viewedCookie.value === id) {
        return new NextResponse(null, { status: 202 });
      }
    }

    //this is a new entry within 24 hrs of the person's last view
    await redis.incr(["pageviews", "page", id].join(":"));

    //if the cookie doesnt already exist, set it
    const cookieValue = viewedCookie
      ? {}
      : { "Set-Cookie": `hasViewed=home; Max-Age=${60 * 60 * 24}` };
    return new NextResponse(null, {
      status: 202,
      headers: cookieValue,
    });
  } catch (error) {
    console.error("Error in increment API:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
