import { IsJSON, IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  CategoryName: string;
  @IsString()
  Color: string;
  @IsString() Picture: string;
  @IsString()
  ProductName: string;
  @IsString()
  Version: string;
  @IsString()
  Type : string
}
