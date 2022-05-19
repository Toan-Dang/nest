import { IsNotEmpty, IsString } from 'class-validator';

export class addOrderDto {
  @IsNotEmpty()
  cartId: string[];
  @IsString()
  payment :string;
}
