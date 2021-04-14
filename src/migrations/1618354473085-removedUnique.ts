import {MigrationInterface, QueryRunner} from "typeorm";

export class removedUnique1618354473085 implements MigrationInterface {
    name = 'removedUnique1618354473085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "product"."code" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61" UNIQUE ("code")`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."code" IS NULL`);
    }

}
