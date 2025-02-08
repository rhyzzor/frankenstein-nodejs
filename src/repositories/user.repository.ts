import { db } from "@/lib/database/kysely";
import type { NewUser } from "@/lib/database/schema/public/User";

export class UserRepository {
	async create(data: NewUser) {
		await db.insertInto("user").values(data).execute();
	}
}
