
import { cardApiRequestSchema, cardApiResponseSchema } from './validation';
import { toast } from '@/hooks/use-toast';

const API_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithTimeout(url: string, options: RequestInit, timeout: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function fetchCards(payload: any, retries = 0): Promise<any[]> {
  try {
    // Validate input payload
    const validatedPayload = cardApiRequestSchema.parse(payload);
    
    const response = await fetchWithTimeout(
      'https://bk-api.bankkaro.com/sp/api/cards',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedPayload),
      },
      API_TIMEOUT
    );

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data = await response.json();
    
    // Validate response data
    const validatedResponse = cardApiResponseSchema.parse(data);
    return validatedResponse.cards || [];
    
  } catch (error) {
    console.error('API Error:', error);
    
    // Retry logic for network errors
    if (retries < MAX_RETRIES && (error instanceof TypeError || error.name === 'AbortError')) {
      await delay(1000 * (retries + 1)); // Exponential backoff
      return fetchCards(payload, retries + 1);
    }
    
    // User-friendly error messages
    let errorMessage = 'Unable to load cards. Please try again.';
    if (error instanceof ApiError) {
      if (error.status === 429) {
        errorMessage = 'Too many requests. Please wait and try again.';
      } else if (error.status >= 500) {
        errorMessage = 'Service temporarily unavailable. Please try again later.';
      }
    } else if (error.name === 'AbortError') {
      errorMessage = 'Request timed out. Please check your connection.';
    }
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
    
    return [];
  }
}

export async function fetchCalculatorResults(payload: any): Promise<any | null> {
  try {
    const response = await fetchWithTimeout(
      'https://card-recommendation-api-v2.bankkaro.com/cg/api/pro',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
      API_TIMEOUT
    );

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    return await response.json();
    
  } catch (error) {
    console.error('Calculator API Error:', error);
    
    toast({
      title: "Calculation Error",
      description: "Unable to calculate rewards. Please try again.",
      variant: "destructive",
    });
    
    return null;
  }
}
