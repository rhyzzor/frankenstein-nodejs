import { UserRepository } from "@/repositories/user.repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUse() {
	const userRepository = new UserRepository();
	const authenticateUseCase = new AuthenticateUseCase(userRepository);

	return authenticateUseCase;
}
