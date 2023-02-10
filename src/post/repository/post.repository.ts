import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../entity/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async findAll(): Promise<Post[]> {
    return await this.find();
  }

  async onCreate(user: User, createPostDto: CreatePostDto): Promise<boolean> {
    const { title, contents } = createPostDto;

    const post = await this.createQueryBuilder('post')
      .insert()
      .values({
        title: title,
        contents: contents,
        user: user,
      })
      .execute();

    return post ? true : false;
  }

  async onDelete(id: string): Promise<boolean> {
    const deletePost = await this.delete(id);

    if (deletePost.affected !== 1) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    return true;
  }
}
