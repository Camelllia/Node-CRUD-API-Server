import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  onCreateUser(createUserDto: CreateUserDto): Promise<boolean> {
    return this.userRepository.onCreate(createUserDto);
  }
}
