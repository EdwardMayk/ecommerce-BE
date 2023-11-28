import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix1701145843852 implements MigrationInterface {
    name = 'Fix1701145843852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password_code" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password_expires" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "uuid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "stock" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "created_at" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "stock" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "uuid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password_expires"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password_code"`);
    }

}
