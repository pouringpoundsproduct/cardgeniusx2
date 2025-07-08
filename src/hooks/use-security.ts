
import { useState, useCallback } from 'react';

interface RateLimitState {
  count: number;
  resetTime: number;
}

const RATE_LIMITS = {
  search: { maxRequests: 10, windowMs: 60000 }, // 10 requests per minute
  api: { maxRequests: 20, windowMs: 60000 }, // 20 requests per minute
};

export const useSecurity = () => {
  const [rateLimits, setRateLimits] = useState<Record<string, RateLimitState>>({});

  const checkRateLimit = useCallback((key: string, limit = RATE_LIMITS.api) => {
    const now = Date.now();
    const current = rateLimits[key];

    if (!current || now > current.resetTime) {
      setRateLimits(prev => ({
        ...prev,
        [key]: { count: 1, resetTime: now + limit.windowMs }
      }));
      return true;
    }

    if (current.count >= limit.maxRequests) {
      return false;
    }

    setRateLimits(prev => ({
      ...prev,
      [key]: { ...current, count: current.count + 1 }
    }));
    return true;
  }, [rateLimits]);

  const canMakeRequest = useCallback((key: string, type: 'search' | 'api' = 'api') => {
    return checkRateLimit(key, RATE_LIMITS[type]);
  }, [checkRateLimit]);

  const sanitizeInput = useCallback((input: string): string => {
    return input
      .trim()
      .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
      .substring(0, 200); // Limit length
  }, []);

  return {
    canMakeRequest,
    sanitizeInput,
  };
};
