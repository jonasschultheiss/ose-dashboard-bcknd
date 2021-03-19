import { MigrationInterface, QueryRunner } from 'typeorm';

export class madeProductionDateNullable1615887135677 implements MigrationInterface {
  name = 'madeProductionDateNullable1615887135677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "productionDate" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "asset"."productionDate" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "asset"."productionDate" IS NULL`);
    await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "productionDate" SET NOT NULL`);
  }
}
