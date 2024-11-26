import { headers } from "next/headers";

interface RateLimitConfig {
  interval: number; // in milliseconds
  maxRequests: number;
}

class RateLimiter {
  private requests: Map<string, number[]>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.requests = new Map();
    this.config = config;
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.interval;

    // Get or initialize request timestamps for this identifier
    let requestTimestamps = this.requests.get(identifier) || [];

    // Remove old timestamps
    requestTimestamps = requestTimestamps.filter(
      (timestamp) => timestamp > windowStart
    );

    // Check if rate limit is exceeded
    if (requestTimestamps.length >= this.config.maxRequests) {
      return true;
    }

    // Add new timestamp and update the map
    requestTimestamps.push(now);
    this.requests.set(identifier, requestTimestamps);

    return false;
  }

  getRemainingTime(identifier: string): number {
    const timestamps = this.requests.get(identifier) || [];
    if (timestamps.length === 0) return 0;

    const oldestTimestamp = timestamps[0];
    const timeUntilReset = oldestTimestamp + this.config.interval - Date.now();

    return Math.max(0, timeUntilReset);
  }
}

// Create a rate limiter instance with a 1-minute window and 3 requests max
const rateLimiter = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  maxRequests: 3,
});

export function getRateLimiter() {
  return rateLimiter;
}

export function getClientIdentifier() {
  const headersList = headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  return `${ip}-${userAgent}`;
}
