import {MigrationInterface, QueryRunner} from "typeorm";

export class changedVariableinProduct1616099551158 implements MigrationInterface {
    name = 'changedVariableinProduct1616099551158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "productCode" TO "code"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "UQ_a3aead4d2b7d774d4b7e6a6c7b2" TO "UQ_99c39b067cfa73c783f0fc49a61"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61" TO "UQ_a3aead4d2b7d774d4b7e6a6c7b2"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "code" TO "productCode"`);
    }

}
