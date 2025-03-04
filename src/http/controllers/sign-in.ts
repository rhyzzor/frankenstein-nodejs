import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUse } from "@/use-cases/factories/make-authenticate-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { signInRequest } from "./dto/request";

export async function signIn(
	request: FastifyRequest<{ Body: signInRequest }>,
	reply: FastifyReply,
) {
	const { email, password } = request.body;

	try {
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
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message });
		}
	}
}
