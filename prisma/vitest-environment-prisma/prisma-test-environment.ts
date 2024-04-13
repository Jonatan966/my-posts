import "dotenv/config";

import { randomUUID } from "crypto";
import { execSync } from "node:child_process";
import { Environment } from "vitest";
import { prisma } from "../../src/services/prisma";
import { generateDatabaseURL } from "../../src/utils/generate-database-url";

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseUrl;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
