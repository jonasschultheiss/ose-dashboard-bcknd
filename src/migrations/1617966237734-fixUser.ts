import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUser1617966237734 implements MigrationInterface {
    name = 'fixUser1617966237734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "modelId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_40b44b13a92b6cf008c3cd355d7" UNIQUE ("modelId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_40b44b13a92b6cf008c3cd355d7" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_40b44b13a92b6cf008c3cd355d7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_40b44b13a92b6cf008c3cd355d7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "modelId"`);
    }

}
