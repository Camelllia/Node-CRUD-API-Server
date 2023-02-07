import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user_all')
  getAllUser(): Promise<User[]> {
    console.log(this.userService.getAllUser());
    return this.userService.getAllUser();
  }

  @Post('/createUser')
  onCreateUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.userService.onCreateUser(createUserDto);
  }
}
