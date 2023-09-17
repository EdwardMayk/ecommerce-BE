import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConfigurationAuth1694462558776 implements MigrationInterface {
  name = 'ConfigurationAuth1694462558776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_activity_platform_enum" AS ENUM('web', 'mobile')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_activity" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "type" character varying(255) NOT NULL, "platform" "public"."user_activity_platform_enum" NOT NULL DEFAULT 'web', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "tenant_id" integer, CONSTRAINT "UQ_089b55dda836a3f62af5eb5342d" UNIQUE ("uuid"), CONSTRAINT "PK_daec6d19443689bda7d7785dff5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "last_login_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_activity" ADD CONSTRAINT "FK_b8b7bc05582c576405a2860bf54" FOREIGN KEY ("tenant_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_activity" DROP CONSTRAINT "FK_b8b7bc05582c576405a2860bf54"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_login_at"`);
    await queryRunner.query(`DROP TABLE "user_activity"`);
    await queryRunner.query(`DROP TYPE "public"."user_activity_platform_enum"`);
  }
}
