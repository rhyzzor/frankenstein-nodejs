import type { UserId } from "@/lib/database/schema/public/User";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { mockUserRepository } from "@/utils/test/mock-user-repository";

let sut: GetUserProfileUseCase;

describe("GetUserProfileUseCase", () => {
	beforeEach(() => {
		sut = new GetUserProfileUseCase(mockUserRepository);

		jest.resetAllMocks();
	});

	it("should be able to get user profile", async () => {
		mockUserRepository.findById.mockResolvedValue({
			id: 1,
			name: "John Doe",
			email: "test@test.com",
			password: "123456",
		});

		const { user } = await sut.execute({ userId: "teste" as UserId });

		expect(user).toEqual(
			expect.objectContaining({
				id: 1,
				name: "John Doe",
				email: "test@test.com",
				password: expect.any(String),
			}),
		);
	});

	it("should not be able to get user profile with wrong id", async () => {
		mockUserRepository.findById.mockResolvedValue(null);

		await expect(
			sut.execute({ userId: "teste" as UserId }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
