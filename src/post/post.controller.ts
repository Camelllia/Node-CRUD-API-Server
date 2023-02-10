import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as Board } from './entity/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/post_all')
  getAllUser(): Promise<Board[]> {
    return this.postService.getAllPost();
  }

  @Post('/createPost')
  @UsePipes(ValidationPipe)
  onCreatePost(@Body() createPostDto: CreatePostDto): Promise<Boolean> {
    return this.postService.onCreatePost(createPostDto);
  }

  @Delete('/post/delete/:id')
  onDeleteUser(@Param('id', ParseIntPipe) id: string): Promise<boolean> {
    return this.postService.onDeletePost(id);
  }
}
