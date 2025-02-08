import type { UserRepository } from "@/repositories/user.repository";
import { hash } from "bcrypt";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

export class RegisterUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ name, email, password }: RegisterUseCaseRequest) {
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
