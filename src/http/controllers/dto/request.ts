import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type signInRequest = z.infer<typeof signInSchema>;

export const registerSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
});

export type registerRequest = z.infer<typeof registerSchema>;
