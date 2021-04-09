import {MigrationInterface, QueryRunner} from "typeorm";

export class eagerLoadingUser1617995844868 implements MigrationInterface {
    name = 'eagerLoadingUser1617995844868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_40b44b13a92b6cf008c3cd355d7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_40b44b13a92b6cf008c3cd355d7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "model" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "UQ_5b956655bd4c7e9e7111abd81e8" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_5b956655bd4c7e9e7111abd81e8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_5b956655bd4c7e9e7111abd81e8"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "UQ_5b956655bd4c7e9e7111abd81e8"`);
        await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "modelId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_40b44b13a92b6cf008c3cd355d7" UNIQUE ("modelId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_40b44b13a92b6cf008c3cd355d7" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
