import { UserRepository } from "@/repositories/user.repository";
import { RegisterUserUseCase } from "../register-user";

export function makeRegisterUserUseCase() {
	const userRepository = new UserRepository();

	const registerUserUseCase = new RegisterUserUseCase(userRepository);

	return registerUserUseCase;
}
