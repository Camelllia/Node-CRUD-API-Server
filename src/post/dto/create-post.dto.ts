import { IsString, IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    contents: string;

    @IsString()
    @IsNotEmpty()
    user_uuid: string;
}