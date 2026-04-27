import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    media: z.array(
      z.object({
        url: z.string().url(),
        providerId: z.string(),
        type: z.enum(['image', 'video'])
      })
    ).min(1).max(3),
    caption: z.string().max(2200).optional(),
    tags: z.array(z.string().toLowerCase()).max(15).optional(),
    isHumanMade: z.literal(true, {
      errorMap: () => ({ message: "You must declare that this artwork is human-made." })
    })
  })
});

export const feedPaginationSchema = z.object({
  query: z.object({
    cursor: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid cursor").optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).default("15")
  })
});