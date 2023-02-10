import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './repository/post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './entity/post.entity';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostRepository, UserRepository],
})
export class PostModule {}