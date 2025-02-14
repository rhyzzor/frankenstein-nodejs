import type { UserId } from "@/lib/database/schema/public/User";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UpdateUserUseCase } from "@/use-cases/update-user";
import { mockUserRepository } from "@/utils/test/mock-user-repository";

let sut: UpdateUserUseCase;

describe("UpdateUserUseCase", () => {
	beforeEach(() => {
		sut = new UpdateUserUseCase(mockUserRepository);

		jest.resetAllMocks();
	});

	it("should be able to update user", async () => {
		mockUserRepository.findById.mockResolvedValue({
			id: "teste",
			name: "John Doe",
			email: "test@test.com",
			password: "123456",
		});

		mockUserRepository.update.mockResolvedValue({
			id: "teste",
			name: "John Doe 2",
			email: "test@test.com",
			password: "123456",
		});

		const { user } = await sut.execute({
			userId: "teste" as UserId,
			data: { name: "John Doe 2" },
		});

		expect(user).toEqual(
			expect.objectContaining({
				id: "teste",
				name: "John Doe 2",
				email: "test@test.com",
				password: expect.any(String),
			}),
		);
	});

	it("should not be able to update a user that does not exist", async () => {
		mockUserRepository.findById.mockResolvedValue(null);

		await expect(
			sut.execute({
				userId: "teste" as UserId,
				data: { name: "John Doe 2" },
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
