import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedProduct1616094162558 implements MigrationInterface {
  name = 'addedProduct1616094162558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer NOT NULL, "name" character varying NOT NULL, "productCode" character varying NOT NULL, "manufacturer" character varying NOT NULL, CONSTRAINT "UQ_a3aead4d2b7d774d4b7e6a6c7b2" UNIQUE ("productCode"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "asset" ADD "productId" integer`);
    await queryRunner.query(
      `ALTER TABLE "asset" ADD CONSTRAINT "FK_e10f15c52c46d84d33c25b84fdc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_e10f15c52c46d84d33c25b84fdc"`);
    await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "productId"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
