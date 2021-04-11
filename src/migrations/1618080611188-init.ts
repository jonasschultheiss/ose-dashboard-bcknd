import {MigrationInterface, QueryRunner} from "typeorm";

export class init1618080611188 implements MigrationInterface {
    name = 'init1618080611188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mesh" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_1ff3b9b8dce7194d38936acc9a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer NOT NULL, "email" character varying NOT NULL, "finishedInitialSetup" boolean NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "model" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "location" character varying, "ownerId" integer, CONSTRAINT "UQ_ae515fddc51941aeaae6070e4d3" UNIQUE ("id", "name"), CONSTRAINT "REL_5b956655bd4c7e9e7111abd81e" UNIQUE ("ownerId"), CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer NOT NULL, "name" character varying, "code" character varying NOT NULL, "manufacturer" character varying NOT NULL, CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61" UNIQUE ("code"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_b801dde9c431d714e5fe97a141a" UNIQUE ("code", "name"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, "accessibility" character varying, "criticality" character varying, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" integer NOT NULL, "serialNumber" character varying NOT NULL, "productionDate" character varying, "lastSeen" character varying, "linkingStatus" "asset_linkingstatus_enum" NOT NULL DEFAULT 'not_linked', "statusId" integer, "productId" integer, "tagId" integer, "meshId" integer, "modelId" integer, CONSTRAINT "UQ_a3380df49dbb7469ceb2f606e4e" UNIQUE ("serialNumber"), CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_5b956655bd4c7e9e7111abd81e8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_24e1fe0b4429e10b4395fdea211" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_e10f15c52c46d84d33c25b84fdc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_aa9af5056f58d6e4102818e6f63" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_ebaf036adf4a95c96d71feebbf1" FOREIGN KEY ("meshId") REFERENCES "mesh"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_17ff2f9d32b57924eefe3029735" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_17ff2f9d32b57924eefe3029735"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_ebaf036adf4a95c96d71feebbf1"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_aa9af5056f58d6e4102818e6f63"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_e10f15c52c46d84d33c25b84fdc"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_24e1fe0b4429e10b4395fdea211"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_5b956655bd4c7e9e7111abd81e8"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "model"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "mesh"`);
    }

}
