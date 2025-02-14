import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUserUseCase } from "@/use-cases/factories/make-register-user-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { registerRequest } from "./dto/request";

export async function register(
	request: FastifyRequest<{ Body: registerRequest }>,
	reply: FastifyReply,
) {
	const { email, name, password } = request.body;

	try {
		const registerUseCase = makeRegisterUserUseCase();

		await registerUseCase.execute({
			email,
			name,
			password,
		});
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(201).send();
}
