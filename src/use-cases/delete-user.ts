import type { UserId } from "@/lib/database/schema/public/User";
import type { UserRepository } from "@/repositories/user.repository";

interface DeleteUserUseCaseRequest {
	userId: UserId;
}

export class DeleteUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ userId }: DeleteUserUseCaseRequest) {
		await this.userRepository.delete(userId);
	}
}
