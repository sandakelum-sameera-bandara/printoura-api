import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Bypasses the buggy helper and reads directly from your environment variables safely
    url: process.env["DIRECT_DATABASE_URL"] || process.env["DATABASE_URL"]!,
  },
});
