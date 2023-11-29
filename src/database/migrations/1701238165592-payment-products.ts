import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentProducts1701238165592 implements MigrationInterface {
  name = 'PaymentProducts1701238165592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_payment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "paymentId" integer, CONSTRAINT "PK_d65f23112292c2267e63affec3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" SERIAL NOT NULL, "externalPaymentId" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "product_payment" ADD CONSTRAINT "FK_426fbe7e542a33c4b7a9b7d99f8" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_payment" DROP CONSTRAINT "FK_426fbe7e542a33c4b7a9b7d99f8"`,
    );
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "product_payment"`);
  }
}
