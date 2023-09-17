import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableUsers1693866181143 implements MigrationInterface {
  name = 'TableUsers1693866181143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_by"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_by" character varying(255) NOT NULL`,
    );
  }
}
