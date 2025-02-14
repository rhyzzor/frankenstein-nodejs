import "dotenv/config";
import { promises as fs } from "node:fs";
import path, { join } from "node:path";
import {
	FileMigrationProvider,
	Kysely,
	Migrator,
	PostgresDialect,
	sql,
} from "kysely";
import { Pool } from "pg";
import { db as kyselyInstance } from "../../src/lib/database/kysely";

export async function changeDatabaseURL(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not set");
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set("schema", schema);

	await migrate(url, schema);
}

async function migrate(url: URL, schema: string) {
	const newDialect = new PostgresDialect({
		pool: new Pool({
			connectionString: url.toString(),
			options: `-c search_path=${schema}`,
		}),
	});

	const db = new Kysely({
		dialect: newDialect,
	});

	const migrator = new Migrator({
		db,
		migrationTableSchema: schema,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: join(__dirname, "../../src/lib/database/migrations"),
		}),
	});

	const migrationMethod: "migrateToLatest" | "migrateDown" =
		process.argv[process.argv.length - 1] === "down"
			? "migrateDown"
			: "migrateToLatest";
	const { error } = await migrator[migrationMethod]();

	if (error) {
		console.error("failed to migrate");
		console.error(error);
		process.exit(1);
	}

	await db.destroy();

	await sql.raw(`SET search_path TO '${schema}'`).execute(kyselyInstance);
}
