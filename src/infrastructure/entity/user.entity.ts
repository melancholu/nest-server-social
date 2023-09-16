import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { generate } from 'short-uuid';
import { User } from 'src/domain/user';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 22 })
  uuid: string;

  @Column({ type: 'varchar', name: 'name', length: 20, unique: true })
  name: string;

  @Column({ type: 'varchar', name: 'email', length: 64, unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'password', length: 72, select: false })
  password: string;

  @Column({ type: 'text', name: 'image_url' })
  imageUrl: string;

  @Column({ type: 'timestamp with time zone' })
  created: Date;

  @Column({ type: 'text', name: 'refresh_token', nullable: true })
  refreshToken: string;

  @BeforeInsert()
  beforeInsertActions() {
    const date = new Date();
    this.uuid = generate();
    this.imageUrl = '';
    this.created = date;
    this.refreshToken = null;
  }

  static create(user: User): UserEntity {
    const entity = new UserEntity();
    entity.name = user.name;
    entity.email = user.email;
    entity.password = user.password;
    entity.imageUrl = user.imageUrl;

    return entity;
  }

  static toUser(entity: UserEntity): User {
    const { uuid, name, email, password, created, refreshToken } = entity;

    return new User({
      uuid,
      name,
      email,
      password,
      created,
      refreshToken,
    });
  }
}
