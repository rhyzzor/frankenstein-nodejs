/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
	rootDir: "..",
	coverageProvider: "v8",
	roots: ["<rootDir>/src"],
	verbose: true,
	passWithNoTests: true,
	collectCoverage: false,
	transform: { ".+\\.ts$": "ts-jest" },
	testEnvironment: "node",
	testMatch: ["<rootDir>/src/http/**/test/e2e/*.test.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
};

export default config;
