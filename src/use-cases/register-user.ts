import type { User } from "@/lib/database/schema/public/User";
import type { UserRepository } from "@/repositories/user.repository";
import { hash } from "bcrypt";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface RegisterUserUseCaseResponse {
	user: User;
}

export class RegisterUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		name,
		email,
		password,
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const passwordHash = await hash(password, 10);

		const userWithSameEmail = await this.userRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const user = await this.userRepository.create({
			name,
			email,
			password: passwordHash,
		});

		return { user };
	}
}
