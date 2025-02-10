import type { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { signInSchema } from "./dto/request";

export async function routes(app: FastifyInstance) {
	app.post(
		"/sign-in",
		{
			schema: {
				querystring: signInSchema,
			},
		},
		authenticate,
	);
}
