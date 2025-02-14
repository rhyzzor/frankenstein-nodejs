import type { FastifyInstance } from "fastify";
import { signInSchema } from "./dto/request";
import { signIn } from "./sign-in";

export async function routes(app: FastifyInstance) {
	app.post(
		"/sign-in",
		{
			schema: {
				querystring: signInSchema,
			},
		},
		signIn,
	);
}
