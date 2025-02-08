import "dotenv/config";

import { defineConfig, getKnexTimestampPrefix } from "kysely-ctl";
import { Pool } from "pg";

export default defineConfig({
  dialect: "pg",
  dialectConfig: {
    pool: new Pool({ connectionString: process.env.DATABASE_URL }),
  },
  migrations: {
    migrationFolder: "src/lib/database/migrations",
    getMigrationPrefix: getKnexTimestampPrefix,
  }
});