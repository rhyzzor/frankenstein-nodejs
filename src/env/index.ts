import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
	DATABASE_URL: z.string().url(),
	JWT_SECRET: z.string(),
	TZ: z.string().default("UTC"),
	PORT: z.coerce.number().default(3000),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("invalid enviroment variables", _env.error.format());

	throw new Error("invalid enviroment variables");
}

export const env = _env.data;
