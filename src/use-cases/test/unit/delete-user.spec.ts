import type { UserId } from "@/lib/database/schema/public/User";
import { DeleteUserUseCase } from "@/use-cases/delete-user";
import { mockUserRepository } from "@/utils/test/mock-user-repository";

const sut = new DeleteUserUseCase(mockUserRepository);

describe("DeleteUserUseCase", () => {
	it("should be able to delete user", async () => {
		await sut.execute({ userId: "teste" as UserId });

		expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
	});
});
