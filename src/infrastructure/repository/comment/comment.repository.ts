import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment, CommentRepository } from 'src/domain/comment';
import { CommentEntity } from 'src/infrastructure/entity';

@Injectable()
export class CommentRepositorySource implements CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
  ) {}

  async getList(
    feedUuid: string,
    take: number,
    skip: number,
  ): Promise<Comment[]> {
    return [];
  }

  async save(comment: Comment): Promise<Comment> {
    const entity = CommentEntity.from(comment);

    const result = await this.repository
      .createQueryBuilder()
      .insert()
      .into(CommentEntity)
      .values(entity)
      .returning('uuid')
      .execute();

    return {
      ...comment,
      uuid: result.raw[0].uuid,
    };
  }
}
