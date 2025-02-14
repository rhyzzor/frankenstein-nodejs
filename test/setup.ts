import { randomUUID } from "node:crypto";
import { deleteSchema } from "./database/delete-schema";
import { changeDatabaseURL } from "./database/migrator";

const schema = randomUUID();

beforeAll(async () => {
	await changeDatabaseURL(schema);
});

afterAll(async () => {
	await deleteSchema(schema);
});
