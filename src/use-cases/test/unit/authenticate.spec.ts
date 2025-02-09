import { AuthenticateUseCase } from "@/use-cases/authenticate";

let sut: AuthenticateUseCase;

const mockUser = {
	email: "test@test.com",
	password: "123456",
};

const mockUserRepository = {
	findByEmail: jest.fn(),
	create: jest.fn(),
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
			id: 1,
		});

		const { user } = await sut.execute(mockUser);

		expect(user).toEqual({
			...mockUser,
			name: "John Doe",
			id: 1,
		});
	});
});
