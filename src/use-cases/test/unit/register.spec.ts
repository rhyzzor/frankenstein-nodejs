import type { UserRepository } from "@/repositories/user.repository";
import { RegisterUseCase } from "@/use-cases/register";

let sut: RegisterUseCase;

const mockUserRepository: UserRepository = {
	create: jest.fn(),
	findByEmail: jest.fn(),
};

const mockUser = {
	name: "John Doe",
	email: "teste@teste.com",
	password: "123456",
};

describe("RegisterUseCase", () => {
	beforeEach(() => {
		sut = new RegisterUseCase(mockUserRepository);
	});

	it("should be able to register", async () => {
		await sut.execute(mockUser);

		expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
		expect(mockUserRepository.create).toHaveBeenCalledWith(
			expect.objectContaining({ ...mockUser, password: expect.any(String) }),
		);
	});
});
