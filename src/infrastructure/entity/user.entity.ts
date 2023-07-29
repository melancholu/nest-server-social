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

  @Column({ type: 'varchar', name: 'password', length: 72 })
  password: string;

  @Column({ type: 'text', name: 'image_url' })
  imageUrl: string;

  @Column({ type: 'timestamp with time zone' })
  created: Date;

  @BeforeInsert()
  beforeInsertActions() {
    const date = new Date();
    this.uuid = generate();
    this.imageUrl = '';
    this.created = date;
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
    const { uuid, name, email, password, created } = entity;

    return new User({
      uuid,
      name,
      email,
      password,
      created: created.toUTCString(),
    });
  }
}
