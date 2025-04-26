import {z} from 'zod';

export const promptSchema = z.object({
    prompt: z.string().min(10, "Prompt must be at least 10 characters long").max(150, "Prompt must be at most 150 characters long"),
})

export const saveSchema = z.object({
    quote: z.string().min(2, "Quote is required and must be at least 2 characters long"),
    activeImage: z.string({
        required_error: "An image must be generated or uploaded before saving",
      }).url("The image URL is invalid"),
    context: z.string().min(2, "Context is required and must be at least 2 characters long"),
})