import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFeed1729232897037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE feed (
          id BIGSERIAL PRIMARY KEY,
          uuid VARCHAR(22) NOT NULL,
          user_id BIGINT REFERENCES "user" (id),
          content TEXT NOT NULL,
          created TIMESTAMPTZ NOT NULL DEFAULT NOW()            
      );
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX feed_uuid
      ON feed (uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS feed;
    `);
  }
}
