import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string; 
}
