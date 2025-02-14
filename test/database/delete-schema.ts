import { db } from "@/lib/database/kysely";
import { sql } from "kysely";

export async function deleteSchema(schema: string) {
	await sql.raw(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`).execute(db);
	await db.destroy();
}
