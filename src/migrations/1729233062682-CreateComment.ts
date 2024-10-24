import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateComment1729233062682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE comment (
          id BIGSERIAL PRIMARY KEY,
          uuid VARCHAR(22) NOT NULL,
          feed_id BIGINT REFERENCES feed (id),
          user_id BIGINT REFERENCES "user" (id),
          content TEXT NOT NULL,
          created TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX comment_uuid
      ON comment (uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS comment;
    `);
  }
}
