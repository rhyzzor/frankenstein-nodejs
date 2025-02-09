import type { User, UserId } from "@/lib/database/schema/public/User";
import type { UserRepository } from "@/repositories/user.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
	userId: UserId;
	data: Partial<User>;
}

export class UpdateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ userId, data }: UpdateUserUseCaseRequest) {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const updatedUser = await this.userRepository.update({
			id: userId,
			...data,
		});

		return { user: updatedUser };
	}
}
