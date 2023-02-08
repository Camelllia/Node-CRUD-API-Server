import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Post } from "../entity/post.entity";

@Injectable()
export class PostRepository extends Repository<Post> {
    constructor(private dataSource: DataSource) {
        super(Post, dataSource.createEntityManager());
    }

    async findAll(): Promise<Post[]> {
        return await this.find();
    }
}