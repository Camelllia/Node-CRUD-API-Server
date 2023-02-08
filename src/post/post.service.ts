import { Injectable } from "@nestjs/common";
import { Post } from "./entity/post.entity";
import { PostRepository } from "./repository/post.repository";

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
    ) {}
     
    async getAllPost(): Promise<Post[]> {
        return this.postRepository.findAll();
    }
}