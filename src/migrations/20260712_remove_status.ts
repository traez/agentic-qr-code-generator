import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "public"."projects" DROP COLUMN IF EXISTS "status";
    DROP TYPE IF EXISTS "public"."enum_projects_status";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published', 'archived');
    ALTER TABLE "public"."projects" ADD COLUMN "status" "enum_projects_status" DEFAULT 'draft';
  `)
}
