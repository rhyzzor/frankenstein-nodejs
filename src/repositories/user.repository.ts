import { db } from "@/lib/database/kysely";
import type { NewUser, UserId } from "@/lib/database/schema/public/User";

export class UserRepository {
	async create(data: NewUser) {
		return await db
			.insertInto("user")
			.values(data)
			.returningAll()
			.executeTakeFirstOrThrow();
	}

	async findById(id: UserId) {
		const user = await db
			.selectFrom("user")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();

		return user;
	}

	async findByEmail(email: string) {
		const user = await db
			.selectFrom("user")
			.selectAll()
			.where("email", "=", email)
			.executeTakeFirst();

		return user;
	}
}
