import type { User, UserId } from "@/lib/database/schema/public/User";
import type { UserRepository } from "@/repositories/user.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
	userId: UserId;
}

interface GetUserProfileUseCaseResponse {
	user: User;
}

export class GetUserProfileUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		userId,
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return { user };
	}
}
