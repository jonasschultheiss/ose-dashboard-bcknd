import {MigrationInterface, QueryRunner} from "typeorm";

export class addedTag1616104058494 implements MigrationInterface {
    name = 'addedTag1616104058494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, "accessibility" character varying, "criticality" character varying, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "tagId" integer`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_aa9af5056f58d6e4102818e6f63" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_aa9af5056f58d6e4102818e6f63"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "tagId"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
