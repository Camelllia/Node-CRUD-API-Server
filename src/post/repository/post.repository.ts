import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../entity/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { User } from 'src/user/entity/user.entity';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async findAll(): Promise<Post[]> {
    return await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .getMany();
  }

  async findByPostId(id: number): Promise<Post> {
    return await this.createQueryBuilder('post')
      .where('post.id = :id', { id: id })
      .getOne();
  }

  async findByUserId(uuid: string): Promise<Post[]> {
    return await this.createQueryBuilder('post')
      .where('post.user_uuid = :uuid', { uuid: uuid })
      .getMany();
  }

  async onCreate(user: User, createPostDto: CreatePostDto): Promise<Boolean> {
    const { title, contents } = createPostDto;

    const post = await this.createQueryBuilder('post')
      .insert()
      .values({
        title: title,
        contents: contents,
        user: user,
      })
      .execute();

    return !!post;
  }

  async onChangePost(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Boolean> {
    const { title, contents } = updatePostDto;
    const changePost = await this.update({ id }, { title, contents });

    if (changePost.affected !== 1) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    return true;
  }

  async onDelete(id: number): Promise<Boolean> {
    const deletePost = await this.delete(id);

    if (deletePost.affected !== 1) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    return true;
  }
}
