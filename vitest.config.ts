import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: "verbose",
    environmentMatchGlobs: [["src/modules/**/controllers/**", "prisma"]],
  },
});
