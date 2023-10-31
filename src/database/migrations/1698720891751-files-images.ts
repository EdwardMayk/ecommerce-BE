import { MigrationInterface, QueryRunner } from "typeorm";

export class FilesImages1698720891751 implements MigrationInterface {
    name = 'FilesImages1698720891751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."files_type_enum" AS ENUM('image', 'video', 'document', 'pdf', 'audio')`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "url" character varying NOT NULL, "name" character varying NOT NULL, "type" "public"."files_type_enum" NOT NULL, CONSTRAINT "UQ_80216965527c9be0babd7ea5bbe" UNIQUE ("uuid"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TYPE "public"."files_type_enum"`);
    }

}
