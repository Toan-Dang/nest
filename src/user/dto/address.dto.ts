import { IsPhoneNumber, IsString } from 'class-validator';
export class AddressUserDto {
  @IsString()
  Name: string;
  @IsString()
  Address: string;
  @IsString()
  PhoneNumber: string;
  @IsString()
  Note: string;
}
