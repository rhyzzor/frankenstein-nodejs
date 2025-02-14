import type { FastifyInstance } from "fastify";
import { registerSchema, signInSchema } from "./dto/request";
import { register } from "./register";
import { signIn } from "./sign-in";

export async function routes(app: FastifyInstance) {
	app.post(
		"/sign-in",
		{
			schema: {
				tags: ["Auth"],
				body: signInSchema,
			},
		},
		signIn,
	);

	app.post(
		"/users",
		{
			schema: {
				tags: ["User"],
				body: registerSchema,
			},
		},
		register,
	);
}
