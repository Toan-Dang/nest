import { IsNotEmpty, IsString } from 'class-validator';

export class BillDto {
  @IsString()
  orderid : string
}
