import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().max(120),
    slug: z.string().max(50),
    description: z.string().max(400),
    imageUrl: z.url()
}).strict()

export type createCategoryInput = z.infer<typeof createCategorySchema>

export const categoryIdSchema = z.uuid();