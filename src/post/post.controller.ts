import { Controller, Get } from "@nestjs/common";
import { Post } from "./entity/post.entity";
import { PostService } from "./post.service";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('/post_all')
    getAllUser(): Promise<Post[]> {
        return this.postService.getAllPost();
    }
}