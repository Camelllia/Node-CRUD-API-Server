import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./entity/post.entity";
import { PostRepository } from "./repository/post.repository";
import { User } from "src/user/entity/user.entity";
import { UserRepository } from "src/user/repository/user.repository";

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        private userRepository: UserRepository,
    ) {}
     
    async getAllPost(): Promise<Post[]> {
        return this.postRepository.findAll();
    }

    async onCreatePost(createPostDto: CreatePostDto): Promise<Boolean> {
        const createUser = await this.userRepository.findById(createPostDto.user_uuid);
        return this.postRepository.onCreate(createUser, createPostDto);
    }
}