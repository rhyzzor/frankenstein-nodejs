import { db } from "@/lib/database/kysely";
import type { NewUser, UserId } from "@/lib/database/schema/public/User";

export class UserRepository {
	async delete(id: UserId) {
		await db.deleteFrom("user").where("id", "=", id).execute();
	}

	async update(data: { id: UserId } & Partial<NewUser>) {
		return await db
			.updateTable("user")
			.set(data)
			.where("id", "=", data.id)
			.returningAll()
			.executeTakeFirstOrThrow();
	}

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
