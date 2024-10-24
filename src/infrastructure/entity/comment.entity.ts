import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generate } from 'short-uuid';
import { Comment, Feed, User } from 'src/domain/dto';
import { FeedEntity, UserEntity } from 'src/infrastructure/entity';

@Entity({
  name: 'comment',
})
export class CommentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 22, unique: true })
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

  static from(comment: Comment): CommentEntity {
    const entity = new CommentEntity();

    entity.feed = comment.feed;
    entity.user = comment.user;
    entity.content = comment.content;

    return entity;
  }

  static to(commentEntity: CommentEntity): Comment {
    const { uuid, feed, user, content, created } = commentEntity;

    return new Comment({
      uuid,
      feed,
      user,
      content,
      created,
    });
  }
}
