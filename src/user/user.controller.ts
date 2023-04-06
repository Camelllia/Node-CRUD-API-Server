import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get('/:id')
  findByUserId(@Param('id') id: string): Promise<User> {
    return this.userService.findByUserId(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  onCreateUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.userService.onCreateUser(createUserDto);
  }

  @Patch('/update/:id')
  @UsePipes(ValidationPipe)
  onUpdateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Boolean> {
    return this.userService.onChangeUser(id, updateUserDto);
  }

  @Patch('/delete/:id')
  onDeleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.onDeleteUser(id);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  userLogin(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return this.userService.login(loginUserDto);
  }
}
