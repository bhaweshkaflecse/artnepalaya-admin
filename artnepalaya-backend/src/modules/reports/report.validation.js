import { z } from 'zod';
export const createReportSchema = z.object({
  body: z.object({
    targetType: z.enum(['Post', 'User']),
    targetId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid target ID format"),
    reason: z.enum(['AI Generated Content', 'Spam', 'Inappropriate Content', 'Harassment', 'Copyright Violation', 'Other']),
    details: z.string().max(500).optional()
  })
});