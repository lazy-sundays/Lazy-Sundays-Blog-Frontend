import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "request-ip";
 
const redis = Redis.fromEnv();
 
export const runtime = 'edge';

/**
 * adapted from https://upstash.com/blog/nextjs13-approuter-view-counter
 */
export async function POST(req) {

    const body = await req.json();
    const id = body.id;
    if (!id) {
        return new NextResponse("Slug not found", { status: 400 });
    }

    const ip = (getClientIp(req));

    if (ip){
      // Hash the IP and turn it into a hex string
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
      const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

      //check if a specific ip address has been viewing a page within the last 24 hours
      const isNew = await redis.set(["deduplicate", hash, id].join(":"), true, {
          nx: true,
          ex: 24 * 60 * 60,
      });
      if (!isNew) {
    
        new NextResponse(null, { status: 202 });
      }
    }
    await redis.incr(["pageviews", "projects", id].join(":"));
    return new NextResponse(null, { status: 202 });
}