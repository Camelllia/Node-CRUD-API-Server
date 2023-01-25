import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

const users: User[] = [
    { id: 1, name: '유저1' },
    { id: 2, name: '유저2' },
    { id: 3, name: '유저3' },
];

@Injectable()
export class UserService {

  getHelloWorld(): string {
    return 'Hello World!!';
  }

  onCreateUser(createUserDto: CreateUserDto): User[] {
    return users.concat({ id: createUserDto.id, name: createUserDto.name });
  }
}
