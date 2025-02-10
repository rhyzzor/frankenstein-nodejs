import { makeAuthenticateUse } from "@/use-cases/factories/make-authenticate-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { signInRequest } from "./dto/request";

export async function authenticate(
	request: FastifyRequest<{ Querystring: signInRequest }>,
	reply: FastifyReply,
) {
	const { email, password } = request.query;

	const authenticateUseCase = makeAuthenticateUse();

	const { user } = await authenticateUseCase.execute({ email, password });

	const token = await reply.jwtSign(
		{},
		{
			sign: {
				sub: user.id,
			},
		},
	);

	const refreshToken = await reply.jwtSign(
		{},
		{
			sign: {
				sub: user.id,
				expiresIn: "7d",
			},
		},
	);

	return reply
		.setCookie("refreshToken", refreshToken, {
			path: "/",
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.status(200)
		.send({ token });
}
