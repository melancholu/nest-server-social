import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLike1729233234250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "like" (
          id BIGSERIAL PRIMARY KEY,
          uuid VARCHAR(22) NOT NULL,
          feed_id BIGINT REFERENCES feed (id),
          user_id BIGINT REFERENCES "user" (id),
          created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          is_active BOOLEAN NOT NULL DEFAULT TRUE
      );
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX like_uuid
      ON "like" (uuid);
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX like_feed_user
      ON "like" (feed_id, user_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "like";
    `);
  }
}
