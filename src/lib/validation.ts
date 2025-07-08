
import { z } from "zod";

// Card search and filter validation
export const searchQuerySchema = z.string()
  .max(100, "Search query too long")
  .regex(/^[a-zA-Z0-9\s\-_]*$/, "Invalid characters in search query");

export const categorySchema = z.enum([
  "All Cards", "Shopping", "Travel", "Dining", "Fuel", "Grocery", "Utility", "Premium"
]);

export const networkSchema = z.enum(["Visa", "Mastercard", "American Express", "RuPay"]);

// Calculator validation schemas
export const spendingValueSchema = z.number()
  .min(0, "Spending cannot be negative")
  .max(1000000, "Spending value too high");

export const calculatorCategorySchema = z.enum([
  "all", "shopping", "utility", "grocery", "fuel", "dining", "food-ordering", "travel"
]);

// API request validation
export const cardApiRequestSchema = z.object({
  slug: z.string().max(100),
  banks_ids: z.array(z.string()),
  card_networks: z.array(z.string()),
  annualFees: z.string().max(50),
  credit_score: z.string().max(50),
  sort_by: z.string().max(50),
  free_cards: z.string().max(50),
  eligiblityPayload: z.record(z.any()),
  cardGeniusPayload: z.record(z.any())
});

// Card response validation
export const cardSchema = z.object({
  id: z.string(),
  name: z.string(),
  bank_name: z.string().optional(),
  card_network: z.string().optional(),
  annual_fee: z.union([z.string(), z.number()]).optional(),
  rating: z.union([z.string(), z.number()]).optional(),
  key_features: z.array(z.string()).optional()
});

export const cardApiResponseSchema = z.object({
  cards: z.array(cardSchema).optional()
});

// Utility functions for input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .substring(0, 200); // Limit length
};

export const validateAndSanitizeSearch = (query: string): string => {
  const sanitized = sanitizeInput(query);
  const result = searchQuerySchema.safeParse(sanitized);
  return result.success ? result.data : '';
};

export const validateSpendingValue = (value: number, min: number, max: number): number => {
  const clampedValue = Math.max(min, Math.min(max, value));
  const result = spendingValueSchema.safeParse(clampedValue);
  return result.success ? result.data : min;
};
