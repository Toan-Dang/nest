import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  product: string;
}
