import { MigrationInterface, QueryRunner } from 'typeorm';

export class createdUser1617718991682 implements MigrationInterface {
  name = 'createdUser1617718991682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer NOT NULL, "email" character varying NOT NULL, "finishedInitialSetup" boolean NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
