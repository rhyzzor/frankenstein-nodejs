import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { RegisterUseCase } from "@/use-cases/register";

let sut: RegisterUseCase;

const mockUserRepository = {
	create: jest.fn(),
	findByEmail: jest.fn(),
	findById: jest.fn(),
};

const mockUser = {
	name: "John Doe",
	email: "teste@teste.com",
	password: "123456",
};

describe("RegisterUseCase", () => {
	beforeEach(() => {
		sut = new RegisterUseCase(mockUserRepository);

		jest.resetAllMocks();
	});

	it("should be able to register", async () => {
		await sut.execute(mockUser);

		expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
		expect(mockUserRepository.create).toHaveBeenCalledWith(
			expect.objectContaining({ ...mockUser, password: expect.any(String) }),
		);
	});

	it("should not be able to register with same email", async () => {
		mockUserRepository.findByEmail.mockResolvedValue(mockUser);

		await expect(sut.execute(mockUser)).rejects.toBeInstanceOf(
			UserAlreadyExistsError,
		);

		expect(mockUserRepository.create).not.toHaveBeenCalled();
	});
});
