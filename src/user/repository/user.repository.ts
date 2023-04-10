import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { BeforeInsert, DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';

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
    const user = await this.findOne({ where: { user_id: id } });

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
      name,
      age,
    });

    return !!user;
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
    const delYn = true;
    const deletedAt = new Date();
    const deleteUser = await this.update(id, { delYn, deletedAt });

    if (deleteUser.affected !== 1) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return true;
  }
}
