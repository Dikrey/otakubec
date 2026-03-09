import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/ratelimit';

export async function middleware(req: NextRequest) {
  const hasRedis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

  if (req.nextUrl.pathname.startsWith('/api/') && hasRedis) {
    try {
      const { success, limit, remaining, reset } = await rateLimit(req);

      if (!success) {
        return new NextResponse(
          JSON.stringify({ 
            error: 'Too Many Requests', 
            message: 'Slow down! You are hitting the limit.' 
          }), 
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            },
          }
        );
      }
    } catch (error) {

      console.error('Middleware Rate Limit Error (Redis):', error);
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};