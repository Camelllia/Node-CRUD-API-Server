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
  Patch,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as Board } from './entity/post.entity';
import { PostService } from './post.service';
import { UpdateUserDto } from '../user/dto/update-user-dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  @Patch('/post/update/:id')
  @UsePipes(ValidationPipe)
  onUpdatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Boolean> {
    return this.postService.onChangePost(id, updatePostDto);
  }

  @Delete('/post/delete/:id')
  onDeletePost(@Param('id', ParseIntPipe) id: number): Promise<Boolean> {
    return this.postService.onDeletePost(id);
  }
}
