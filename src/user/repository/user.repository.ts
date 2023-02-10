import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAll(): Promise<User[]> {
    return await this.find();
  }

  //단일 유저 조회
  async findById(id: string): Promise<User> {
    const user = await this.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return user;
  }

  async onCreate(createUserDto: CreateUserDto): Promise<boolean> {
    const { user_id, password, name, age } = createUserDto;

    const user = await this.save({
      user_id,
      password,
      salt: 'salt',
      name,
      age,
    });

    return user ? true : false;
  }

  async onChangeUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Boolean> {
    const { name, age } = updateUserDto;
    const changeUser = await this.update({ id }, { name, age });

    if (changeUser.affected !== 1) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return true;
  }

  async onDeleteUser(id: string): Promise<Boolean> {
    const deleteUser = await this.delete(id);

    if (deleteUser.affected !== 1) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return true;
  }
}
