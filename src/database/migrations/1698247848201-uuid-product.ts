import { MigrationInterface, QueryRunner } from "typeorm";

export class UuidProduct1698247848201 implements MigrationInterface {
    name = 'UuidProduct1698247848201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "stock" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "brand" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "uuid"`);
    }

}
