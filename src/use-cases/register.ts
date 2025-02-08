import type { UserRepository } from "@/repositories/user.repository";
import { hash } from "bcrypt";

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

export class RegisterUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		name,
		email,
		password,
	}: RegisterUseCaseRequest): Promise<void> {
		const passwordHash = await hash(password, 10);
	}
}
