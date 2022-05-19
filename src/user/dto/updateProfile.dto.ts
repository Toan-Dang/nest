import { IsNotEmpty, IsString } from 'class-validator';

export class changeProfileDto {
  @IsString()
  @IsNotEmpty()
  Text: string;
}
