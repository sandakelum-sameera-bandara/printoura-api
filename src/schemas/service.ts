import { z } from 'zod'

export const createServiceSchema = z.object({
    id: z.string().startsWith('s-').min(2),
    // caregoryID: z.string().startsWith('c-'),
    title: z.string().max(50),
    description: z.string().max(100),
    options: z.string(),
    image: z.url()
}).strict()

export type createServiceInput = z.infer<typeof createServiceSchema>