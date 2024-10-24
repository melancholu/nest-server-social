import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1729232436286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
            id BIGSERIAL PRIMARY KEY,
            uuid VARCHAR(22) NOT NULL,
            name VARCHAR(20) NOT NULL,
            email VARCHAR(64) NOT NULL,
            password VARCHAR(72) NOT NULL,
            image_url TEXT NOT NULL,
            created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            refresh_token TEXT
        );
    `);

    await queryRunner.query(`
        CREATE UNIQUE INDEX user_uuid
        ON "user" (uuid);
    `);

    await queryRunner.query(`
        CREATE UNIQUE INDEX user_name
        ON "user" (name);
    `);

    await queryRunner.query(`
        CREATE UNIQUE INDEX user_email
        ON "user" (email);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "user";
    `);
  }
}
