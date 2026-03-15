import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let pool: Pool | null = null;
let dbSingleton: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (dbSingleton) return dbSingleton;
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.SUPABASE_DB_URL ||
    "";
  if (!connectionString) {
    throw new Error("POSTGRES_URL is not set");
  }
  pool = new Pool({ connectionString, max: 1, keepAlive: true });
  dbSingleton = drizzle(pool);
  return dbSingleton;
}

