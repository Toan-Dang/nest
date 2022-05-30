import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  FullName: string;
  @IsString()
  Birthday: string;
  @IsString()
  PhoneNumber: string;
}
