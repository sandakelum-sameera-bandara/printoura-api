import { z } from 'zod';

export const createCategorySchema = z.object({
    id: z.string().startsWith('c-'),
    title: z.string().max(120),
    availables: z.string().max(400),
    image: z.url()
}).strict()

export type createCategoryInput = z.infer<typeof createCategorySchema>