import { Pool, type PoolClient, type QueryResultRow } from "pg"

let pool: Pool | null = null
let initialized: Promise<void> | null = null

function databaseUrl(): string | null {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || null
}

export function hasDatabase(): boolean {
  return Boolean(databaseUrl())
}

function getPool(): Pool {
  const connectionString = databaseUrl()
  if (!connectionString) throw new Error("DATABASE_URL is not configured")
  if (!pool) {
    pool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    })
  }
  return pool
}

async function createSchema(client: PoolClient): Promise<void> {
  await client.query(`
    CREATE TABLE IF NOT EXISTS access_keys (
      code text PRIMARY KEY,
      label text NOT NULL,
      days integer NOT NULL,
      created_at bigint NOT NULL,
      expires_at bigint NOT NULL,
      revoked boolean NOT NULL DEFAULT false,
      last_seen bigint
    );

    CREATE TABLE IF NOT EXISTS accounts (
      code text PRIMARY KEY,
      data jsonb NOT NULL DEFAULT '{}'::jsonb,
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS app_settings (
      key text PRIMARY KEY,
      value jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS app_kv (
      key text PRIMARY KEY,
      value jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `)
}

export async function ensureDb(): Promise<void> {
  if (!hasDatabase()) return
  if (!initialized) {
    initialized = (async () => {
      const client = await getPool().connect()
      try {
        await createSchema(client)
      } finally {
        client.release()
      }
    })()
  }
  await initialized
}

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, values: unknown[] = []) {
  await ensureDb()
  return getPool().query<T>(text, values)
}

export async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  await ensureDb()
  const client = await getPool().connect()
  try {
    await client.query("BEGIN")
    const result = await fn(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}
