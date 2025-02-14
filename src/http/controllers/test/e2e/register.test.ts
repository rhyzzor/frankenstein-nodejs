import { app } from "@/app";
import request from "supertest";

describe("Register user (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to register a new user", async () => {
		const response = await request(app.server).post("/api/users").send({
			name: "Teste",
			email: "test@test.com",
			password: "123456",
		});

		expect(response.statusCode).toEqual(201);
	});
});
