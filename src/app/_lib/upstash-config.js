import { Redis } from "@upstash/redis";

// Determine if we're in a production environment
// Only enable Upstash in production, not in development even if credentials exist
const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production";

// Check if we have valid Upstash credentials
const hasValidCredentials =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

// Only create Redis client in production AND with valid credentials
const redis = hasValidCredentials
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export { redis, isProduction };
