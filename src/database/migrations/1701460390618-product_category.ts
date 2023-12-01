import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategory1701460390618 implements MigrationInterface {
    name = 'ProductCategory1701460390618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`CREATE TABLE "product_category" ("productsId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_e2dce35dc66f19d79be5deceb43" PRIMARY KEY ("productsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a32cf3cfd513cd9feb72c64f86" ON "product_category" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_559e1bc4d01ef1e56d75117ab9" ON "product_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_a32cf3cfd513cd9feb72c64f864" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_a32cf3cfd513cd9feb72c64f864"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_559e1bc4d01ef1e56d75117ab9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a32cf3cfd513cd9feb72c64f86"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
