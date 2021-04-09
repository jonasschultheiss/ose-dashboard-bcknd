import {MigrationInterface, QueryRunner} from "typeorm";

export class modelUserAssotiation1617954527492 implements MigrationInterface {
    name = 'modelUserAssotiation1617954527492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "model" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_ae515fddc51941aeaae6070e4d3" UNIQUE ("id", "name"), CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "model"`);
    }

}
