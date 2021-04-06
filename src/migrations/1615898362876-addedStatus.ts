import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedStatus1615898362876 implements MigrationInterface {
  name = 'addedStatus1615898362876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_b801dde9c431d714e5fe97a141a" UNIQUE ("code", "name"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "status"`);
  }
}
