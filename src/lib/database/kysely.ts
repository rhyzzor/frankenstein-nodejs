import { env } from "@/env";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: env.DATABASE_URL,
	}),
});

export const db = new Kysely({
	dialect,
	plugins: [new CamelCasePlugin()],
	log: ["error", "query"],
});
