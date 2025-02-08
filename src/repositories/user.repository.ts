import { db } from "@/lib/database/kysely";
import type { NewUser } from "@/lib/database/schema/public/User";

export class UserRepository {
	async create(data: NewUser) {
		return await db.insertInto("user").values(data).returningAll().execute();
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
