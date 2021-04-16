import {MigrationInterface, QueryRunner} from "typeorm";

export class init1618569294359 implements MigrationInterface {
    name = 'init1618569294359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meshes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_877daf97513052a77bf95ed262c" UNIQUE ("name"), CONSTRAINT "PK_359fe8bd386a5fd42c684aecb59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer NOT NULL, "email" character varying NOT NULL, "finishedInitialSetup" boolean NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433" UNIQUE ("id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "location" character varying, "ownerId" integer, CONSTRAINT "UQ_1510a4c8d4efbec5f500860ce21" UNIQUE ("id", "name"), CONSTRAINT "REL_87d13f591f17b2b381172ea602" UNIQUE ("ownerId"), CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" integer NOT NULL, "name" character varying, "code" character varying NOT NULL, "manufacturer" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_b801dde9c431d714e5fe97a141a" UNIQUE ("code", "name"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, "accessibility" character varying, "criticality" character varying, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "assets_linkingstatus_enum" AS ENUM('not_linked', 'automatically_linked', 'automatic_linking_failed', 'manually_linked')`);
        await queryRunner.query(`CREATE TABLE "assets" ("id" integer NOT NULL, "serialNumber" character varying NOT NULL, "productionDate" character varying, "lastSeen" character varying, "linkingStatus" "assets_linkingstatus_enum" NOT NULL DEFAULT 'not_linked', "statusId" integer, "productId" integer, "tagId" integer, "meshId" integer, "modelId" integer, CONSTRAINT "UQ_6d1ff17a763abe352afe92921d6" UNIQUE ("serialNumber"), CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_87d13f591f17b2b381172ea602c" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_eac224433eb66ded5ab3222718c" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_c090ec02a7c58d39e7887c96e09" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_d426e07a0f65352f39b391c5db8" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_c9c8cb8d74983fee0efbd95f710" FOREIGN KEY ("meshId") REFERENCES "meshes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_ae5be6a7e55f503445d2ff5aaaf" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_ae5be6a7e55f503445d2ff5aaaf"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_c9c8cb8d74983fee0efbd95f710"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_d426e07a0f65352f39b391c5db8"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_c090ec02a7c58d39e7887c96e09"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_eac224433eb66ded5ab3222718c"`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_87d13f591f17b2b381172ea602c"`);
        await queryRunner.query(`DROP TABLE "assets"`);
        await queryRunner.query(`DROP TYPE "assets_linkingstatus_enum"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "meshes"`);
    }

}
