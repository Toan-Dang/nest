import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CartDto {
  @IsString()
  @IsNotEmpty()
  ProductId: string;
}
