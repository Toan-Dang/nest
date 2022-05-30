import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  FullName: string;
  @IsString()
  Email: string;
  @IsString()
  UserName: string;
}
