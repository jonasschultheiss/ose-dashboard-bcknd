import {MigrationInterface, QueryRunner} from "typeorm";

export class changedNullableProduct1616101724527 implements MigrationInterface {
    name = 'changedNullableProduct1616101724527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."name" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "product"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "name" SET NOT NULL`);
    }

}
