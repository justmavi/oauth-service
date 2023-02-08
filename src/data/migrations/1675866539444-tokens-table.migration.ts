import { MigrationInterface, QueryRunner } from 'typeorm';

export class TokensTable1675866539444 implements MigrationInterface {
  name = 'TokensTable1675866539444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "provider" integer NOT NULL, "token" character varying NOT NULL, "device_id" character varying NOT NULL, "device_name" character varying NOT NULL, "user_agent" character varying NOT NULL, "first_login_date" TIMESTAMP NOT NULL DEFAULT now(), "last_login_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "token"`);
  }
}
