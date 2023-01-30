import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';

const users: User[] = [
    { id: 1, name: '유저1' },
    { id: 2, name: '유저2' },
    { id: 3, name: '유저3' },
];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository : UserRepository,
  ) {}

  getAllUser(): User[] {
    return users;
  }

  onCreateUser(createUserDto: CreateUserDto): User[] {
    return users.concat({ id: createUserDto.id, name: createUserDto.name });
  }
}
