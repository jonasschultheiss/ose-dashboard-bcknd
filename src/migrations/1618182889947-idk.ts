import {MigrationInterface, QueryRunner} from "typeorm";

export class idk1618182889947 implements MigrationInterface {
    name = 'idk1618182889947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "mesh"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "mesh" ADD CONSTRAINT "UQ_73cf5b47dcddd2bb78430bb49f2" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_5b956655bd4c7e9e7111abd81e8"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_5b956655bd4c7e9e7111abd81e8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_5b956655bd4c7e9e7111abd81e8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_5b956655bd4c7e9e7111abd81e8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mesh" DROP CONSTRAINT "UQ_73cf5b47dcddd2bb78430bb49f2"`);
        await queryRunner.query(`COMMENT ON COLUMN "mesh"."name" IS NULL`);
    }

}
