import { Controller, Get, Post, Body, Param, ParseIntPipe, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user_all')
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get('/user/:id')
  findByUserId(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findByUserId(id);
  }

  @Post('/createUser')
  @UsePipes(ValidationPipe)
  onCreateUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.userService.onCreateUser(createUserDto);
  }
}
