require("dotenv/config");

const {
	kyselyCamelCaseHook,
	makeKyselyHook,
	kyselyTypeFilter,
} = require("kanel-kysely");

/** @type {import('kanel').Config} */
module.exports = {
	connection: {
		connectionString: process.env.DATABASE_URL,
	},
	typeFilter: kyselyTypeFilter,
	preDeleteOutputFolder: true,
	outputPath: "./src/lib/database/schema",
	preRenderHooks: [makeKyselyHook(), kyselyCamelCaseHook],
};
