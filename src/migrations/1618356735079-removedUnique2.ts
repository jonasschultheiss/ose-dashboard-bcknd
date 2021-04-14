import {MigrationInterface, QueryRunner} from "typeorm";

export class removedUnique21618356735079 implements MigrationInterface {
    name = 'removedUnique21618356735079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "tag"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name")`);
        await queryRunner.query(`COMMENT ON COLUMN "tag"."name" IS NULL`);
    }

}
