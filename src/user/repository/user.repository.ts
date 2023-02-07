import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findAll(): Promise<User[]> {
        return await this.find();
    }

    async onCreate(createUserDto: CreateUserDto): Promise<boolean> {
        const { user_id, password, name, age } = createUserDto;

        const user = await this.save({
            user_id,
            password,
            salt: '임시',
            name,
            age,
        });

        return user ? true : false;
    }
}