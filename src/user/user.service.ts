import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
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

  async findByUserId(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async onCreateUser(createUserDto: CreateUserDto): Promise<boolean> {
    return this.userRepository.onCreate(createUserDto);
  }

  async onChangeUser(id: string, updateUserDto: UpdateUserDto): Promise<Boolean> {
    return this.userRepository.onChanageUser(id, updateUserDto);
  }

  async onDeleteUser(id: string): Promise<Boolean> {
    return this.userRepository.onDeleteUser(id);
  }
}
