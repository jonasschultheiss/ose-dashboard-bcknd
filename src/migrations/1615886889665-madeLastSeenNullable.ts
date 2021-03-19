import { MigrationInterface, QueryRunner } from 'typeorm';

export class madeLastSeenNullable1615886889665 implements MigrationInterface {
  name = 'madeLastSeenNullable1615886889665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "lastSeen" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "asset"."lastSeen" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "asset"."lastSeen" IS NULL`);
    await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "lastSeen" SET NOT NULL`);
  }
}
