import { MigrationInterface, QueryRunner } from 'typeorm';

export class relationAssetStatus1615899922442 implements MigrationInterface {
  name = 'relationAssetStatus1615899922442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status" ADD "assetsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "FK_3394792ebc316b4c675af8ac695" FOREIGN KEY ("assetsId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "FK_3394792ebc316b4c675af8ac695"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "assetsId"`);
  }
}
