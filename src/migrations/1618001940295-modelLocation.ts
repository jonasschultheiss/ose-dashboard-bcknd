import {MigrationInterface, QueryRunner} from "typeorm";

export class modelLocation1618001940295 implements MigrationInterface {
    name = 'modelLocation1618001940295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "model" ADD "location" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "location"`);
    }

}
