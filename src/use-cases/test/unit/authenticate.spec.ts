import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { mockUserRepository } from "@/utils/test/mock-user-repository";
import { hash } from "bcrypt";

let sut: AuthenticateUseCase;

const mockUser = {
	email: "test@test.com",
	password: "123456",
};

describe("AuthenticateUseCase", () => {
	beforeEach(() => {
		sut = new AuthenticateUseCase(mockUserRepository);

		jest.resetAllMocks();
	});

	it("should be able to authenticate", async () => {
		mockUserRepository.findByEmail.mockResolvedValue({
			...mockUser,
			name: "John Doe",
			password: await hash("123456", 10),
			id: 1,
		});

		const { user } = await sut.execute(mockUser);

		expect(user).toEqual(
			expect.objectContaining({
				id: 1,
				name: "John Doe",
				email: "test@test.com",
				password: expect.any(String),
			}),
		);
	});

	it("should not be able to authenticate with wrong email", async () => {
		mockUserRepository.findByEmail.mockResolvedValue(null);

		await expect(sut.execute(mockUser)).rejects.toBeInstanceOf(
			InvalidCredentialsError,
		);
	});

	it("should not be able to authenticate with wrong password", async () => {
		mockUserRepository.findByEmail.mockResolvedValue({
			...mockUser,
			name: "John Doe",
			password: await hash("123456", 10),
			id: 1,
		});

		await expect(
			sut.execute({ ...mockUser, password: "wrong-password" }),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
