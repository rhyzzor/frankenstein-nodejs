import { env } from "@/env";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type Database from "./schema/Database";

const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: env.DATABASE_URL,
	}),
});

export const db = new Kysely<Database>({
	dialect,
	plugins: [new CamelCasePlugin()],
	log: env.NODE_ENV === "dev" ? ["query", "error"] : ["error"],
});
