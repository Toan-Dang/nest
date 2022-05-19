import { IsNotEmpty, IsString } from 'class-validator';

export class changePasswordDto {
  @IsString()
  @IsNotEmpty()
  Old_Value: string;
  @IsString()
  @IsNotEmpty()
  New_Value: string;
}
