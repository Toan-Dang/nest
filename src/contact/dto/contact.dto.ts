import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
