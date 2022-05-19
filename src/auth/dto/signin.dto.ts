import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
