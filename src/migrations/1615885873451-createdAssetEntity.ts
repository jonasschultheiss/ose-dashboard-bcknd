import { MigrationInterface, QueryRunner } from 'typeorm';

export class createdAssetEntity1615885873451 implements MigrationInterface {
  name = 'createdAssetEntity1615885873451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "asset" ("id" integer NOT NULL, "serialNumber" character varying NOT NULL, "productionDate" character varying NOT NULL, "lastSeen" character varying NOT NULL, CONSTRAINT "UQ_a3380df49dbb7469ceb2f606e4e" UNIQUE ("serialNumber"), CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "asset"`);
  }
}
