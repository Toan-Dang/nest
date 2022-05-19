import { IsPhoneNumber, IsString } from 'class-validator';
export class updateAddressUserDto {
  @IsString()
  Name_old: string;
  @IsString()
  Address_old: string;
  @IsPhoneNumber()
  PhoneNumber_old: string;
  @IsString()
  Note_old: string;

  @IsString()
  Name_new: string;
  @IsString()
  Address_new: string;
  @IsPhoneNumber()
  PhoneNumber_new: string;
  @IsString()
  Note_new: string;
}
