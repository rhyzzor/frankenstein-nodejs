import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "User API",
			description: "User API documentation",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "10m",
	},
});

app.register(fastifyCookie);

app.get("/", () => {
	return { message: "hello world" };
});
