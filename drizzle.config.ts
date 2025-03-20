import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
const SUPABASE_HOST = process.env.VITE_SUPABASE_URL?.replace("https://", "");
const SUPABASE_USER = "postgres";
const SUPABASE_PASSWORD = process.env.SUPABASE_DATABASE_PASSWORD;
const SUPABASE_DATABASE = "postgres";
const SUPABASE_PORT = 5432;

if (!SUPABASE_HOST || !SUPABASE_PASSWORD) {
  throw new Error("Missing environment variables for database connection.");
}

const DATABASE_URL = `postgres://${SUPABASE_USER}:${encodeURIComponent(
  SUPABASE_PASSWORD
)}@${SUPABASE_HOST}:${SUPABASE_PORT}/${SUPABASE_DATABASE}`;

console.log("Generated DATABASE_URL:", DATABASE_URL);

export default {
  schema: './src/lib/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
