import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generate } from 'short-uuid';
import { Feed, Like, User } from 'src/domain/dto';
import { FeedEntity, UserEntity } from 'src/infrastructure/entity';

@Entity({
  name: 'like',
})
export class LikeEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 22 })
  uuid: string;

  @ManyToOne(() => FeedEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'id' })
  feed: Feed;

  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'timestamp with time zone' })
  created: Date;

  @Column({ type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @BeforeInsert()
  beforeInsertActions() {
    const date = new Date();
    this.uuid = generate();
    this.created = date;
  }

  static from(like: Like): LikeEntity {
    const entity = new LikeEntity();

    entity.uuid = like.uuid;
    entity.feed = like.feed;
    entity.user = like.user;

    return entity;
  }

  static to(likeEntity: LikeEntity): Like {
    const { id, uuid, feed, user, created } = likeEntity;

    return new Like({
      id,
      uuid,
      feed,
      user,
      created,
    });
  }
}
