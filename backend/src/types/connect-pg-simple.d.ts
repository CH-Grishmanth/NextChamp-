declare module 'connect-pg-simple' {
  import { SessionStore } from 'express-session';
  import { Pool } from 'pg';

  interface PgSessionOptions {
    pool: Pool;
    tableName?: string;
  }

  function connectPgSimple(session: any): {
    new (options: PgSessionOptions): SessionStore;
  };

  export = connectPgSimple;
}