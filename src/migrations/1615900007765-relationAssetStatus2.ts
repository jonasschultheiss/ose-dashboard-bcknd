import { MigrationInterface, QueryRunner } from 'typeorm';

export class relationAssetStatus21615900007765 implements MigrationInterface {
  name = 'relationAssetStatus21615900007765';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "FK_3394792ebc316b4c675af8ac695"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "assetsId"`);
    await queryRunner.query(`ALTER TABLE "asset" ADD "statusId" integer`);
    await queryRunner.query(
      `ALTER TABLE "asset" ADD CONSTRAINT "FK_24e1fe0b4429e10b4395fdea211" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_24e1fe0b4429e10b4395fdea211"`);
    await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "status" ADD "assetsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "FK_3394792ebc316b4c675af8ac695" FOREIGN KEY ("assetsId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
