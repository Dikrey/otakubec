import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

let ratelimit: Ratelimit | null = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  const redis = Redis.fromEnv();

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
  });
}

export async function rateLimit(req: NextRequest) {
  if (!ratelimit) {
    // kalau redis tidak ada, skip ratelimit
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }

  const ip =
    (req as any).ip ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for") ??
    "127.0.0.1";

  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);

  return { success, pending, limit, reset, remaining };
}