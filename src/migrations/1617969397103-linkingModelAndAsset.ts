import {MigrationInterface, QueryRunner} from "typeorm";

export class linkingModelAndAsset1617969397103 implements MigrationInterface {
    name = 'linkingModelAndAsset1617969397103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" ADD "modelId" integer`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_17ff2f9d32b57924eefe3029735" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_17ff2f9d32b57924eefe3029735"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "modelId"`);
    }

}
