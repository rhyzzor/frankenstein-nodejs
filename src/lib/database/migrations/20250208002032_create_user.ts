import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("user")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("email", "varchar", (col) => col.notNull())
		.addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.notNull().defaultTo("now()"))
    .addColumn("updated_at", "timestamp", (col) => col.notNull().defaultTo("now()"))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("user").execute();
}
