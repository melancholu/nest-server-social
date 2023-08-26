import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generate } from 'short-uuid';
import { Feed } from 'src/domain/feed';
import { User } from 'src/domain/user';
import { UserEntity } from 'src/infrastructure/entity';

@Entity({
  name: 'feed',
})
export class FeedEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 22 })
  uuid: string;

  @ManyToMany(() => UserEntity, {
    nullable: false,
  })
  user: User;

  @Column({ type: 'text', name: 'content' })
  content: string;

  @Column({ type: 'timestamp with time zone' })
  created: Date;

  @BeforeInsert()
  beforeInsertActions() {
    const date = new Date();
    this.uuid = generate();
    this.created = date;
  }

  static create(feed: Feed): FeedEntity {
    const entity = new FeedEntity();
    entity.user = feed.user;
    entity.content = feed.content;

    return entity;
  }
}
