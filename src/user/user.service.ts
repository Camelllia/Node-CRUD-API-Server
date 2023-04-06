import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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

  async onChangeUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Boolean> { 
    return this.userRepository.onChangeUser(id, updateUserDto);
  }

  async onDeleteUser(id: string): Promise<Boolean> {
    return this.userRepository.onDeleteUser(id);
  }

  async login(loginUserDto: LoginUserDto) {
    const isValidUser = await this.validateUser(loginUserDto);

    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { uuid: isValidUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '60m',
        secret: this.configService.get<string>('JWT_SECRET')
      }),
    };
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    // User 객체 리턴
    const isValidUser = await this.findByUserId(loginUserDto.user_id);

    if (isValidUser && isValidUser.password === loginUserDto.password) {
      return isValidUser;
    }
    return null;
  }
}
