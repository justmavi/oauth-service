import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetUserIdColumnTypeToLong1675867283905
  implements MigrationInterface
{
  name = 'SetUserIdColumnTypeToLong1675867283905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token" ALTER COLUMN "user_id" SET DATA TYPE bigint`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token" DROP COLUMN "user_id" SET DATA TYPE integer`,
    );
  }
}
