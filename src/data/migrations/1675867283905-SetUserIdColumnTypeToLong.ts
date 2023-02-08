import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetUserIdColumnTypeToLong1675867283905
  implements MigrationInterface
{
  name = 'SetUserIdColumnTypeToLong1675867283905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "token" ADD "user_id" bigint NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "token" ADD "user_id" integer NOT NULL`,
    );
  }
}
