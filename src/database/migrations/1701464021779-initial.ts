import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1701464021779 implements MigrationInterface {
  name = 'Initial1701464021779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "value" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "status" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_cdc7776894e484eaed828ca0616" UNIQUE ("uuid"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "firstname" character varying(255), "lastname" character varying(255), "profile_picture" character varying(255), "email" character varying(255) NOT NULL, "password" character varying(255), "refresh_token" character varying(255), "reset_password_code" character varying(255), "reset_password_expires" TIMESTAMP, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "last_login_at" TIMESTAMP, "roleId" integer, CONSTRAINT "UQ_951b8f1dfc94ac1d0301a14b7e1" UNIQUE ("uuid"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "totalPrice" numeric(10,2) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer, "product_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "image" character varying(255) NOT NULL, "brand" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_payment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "paymentId" integer, CONSTRAINT "PK_d65f23112292c2267e63affec3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" SERIAL NOT NULL, "externalPaymentId" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "url" character varying NOT NULL, "name" character varying NOT NULL, "type" "public"."files_type_enum" NOT NULL, CONSTRAINT "UQ_80216965527c9be0babd7ea5bbe" UNIQUE ("uuid"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_activity" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "type" character varying(255) NOT NULL, "platform" "public"."user_activity_platform_enum" NOT NULL DEFAULT 'web', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "tenant_id" integer, CONSTRAINT "UQ_089b55dda836a3f62af5eb5342d" UNIQUE ("uuid"), CONSTRAINT "PK_daec6d19443689bda7d7785dff5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "providers" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "ruc" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "province" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "contactName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_83c3cd1e464e41f9c94071f1bce" UNIQUE ("uuid"), CONSTRAINT "UQ_bdf8b1b6a25146607aaa8257597" UNIQUE ("ruc"), CONSTRAINT "UQ_791205935cba34175b00552c793" UNIQUE ("address"), CONSTRAINT "UQ_91be59035f3e8230e987d0cc9c9" UNIQUE ("province"), CONSTRAINT "UQ_d735474e539e674ba3702eddc44" UNIQUE ("name"), CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_category" ("productsId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_e2dce35dc66f19d79be5deceb43" PRIMARY KEY ("productsId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a32cf3cfd513cd9feb72c64f86" ON "product_category" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_559e1bc4d01ef1e56d75117ab9" ON "product_category" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_ac832121b6c331b084ecc4121fd" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_payment" ADD CONSTRAINT "FK_426fbe7e542a33c4b7a9b7d99f8" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_activity" ADD CONSTRAINT "FK_b8b7bc05582c576405a2860bf54" FOREIGN KEY ("tenant_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_a32cf3cfd513cd9feb72c64f864" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_a32cf3cfd513cd9feb72c64f864"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_activity" DROP CONSTRAINT "FK_b8b7bc05582c576405a2860bf54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_payment" DROP CONSTRAINT "FK_426fbe7e542a33c4b7a9b7d99f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_ac832121b6c331b084ecc4121fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_559e1bc4d01ef1e56d75117ab9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a32cf3cfd513cd9feb72c64f86"`,
    );
    await queryRunner.query(`DROP TABLE "product_category"`);
    await queryRunner.query(`DROP TABLE "providers"`);
    await queryRunner.query(`DROP TABLE "user_activity"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "product_payment"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
