export function generateDatabaseURL(schema: string) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("Please provide a DATABASE_URL environment variable");
  }

  const url = new URL(databaseUrl);

  url.searchParams.set("schema", schema);

  return url.toString();
}
