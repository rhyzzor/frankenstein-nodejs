import type { UserId } from "@/lib/database/schema/public/User";
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
			id: 1,
			name: "John Doe",
			email: "test@test.com",
			password: "123456",
		});

		mockUserRepository.update.mockResolvedValue({
			id: 1,
			name: "John Doe 2",
			email: "test@test.com",
			password: "123456",
		});

		const { user } = await sut.execute({
			userId: 1 as UserId,
			data: { name: "John Doe 2" },
		});

		expect(user).toEqual(
			expect.objectContaining({
				id: 1,
				name: "John Doe 2",
				email: "test@test.com",
				password: expect.any(String),
			}),
		);
	});
});
