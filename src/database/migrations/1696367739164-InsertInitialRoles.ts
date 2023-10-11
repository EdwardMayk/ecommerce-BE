import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class InsertInitialRoles1696367739164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminUuid = uuidv4();
    const userUuid = uuidv4();

    await queryRunner.query(`
      INSERT INTO roles (uuid, value, name, status)
      VALUES
      ('${adminUuid}', 'admin', 'Admin', true),
      ('${userUuid}', 'user', 'User', true);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM roles
      WHERE value = 'admin' OR value = 'user';
    `);
  }
}
