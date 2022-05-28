import { BillDto } from './dto/Bill.dto';
import { addOrderDto } from './dto/addorder.dto';
import { OrderService } from './order.service';
import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@Controller('order')
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private orderservice: OrderService) {}
  @Post()
  addOrder(@GetUser('id') userId: string, @Body() cartid: addOrderDto) {
    return this.orderservice.addOrder(userId, cartid);
  }

  @Get('Bill')
  getUserBill(@GetUser('id') userId: string) {
    return this.orderservice.getBill(userId);
  }
  @Get('detail/:id')
  getUserOrderDetail(
    @GetUser('id') userid: string,
    @Param('id') orderid: string,
  ) {
    return this.orderservice.getDetail(userid, orderid);
  }

  @Post('/accept')
  acceptBill(@Body() dto: BillDto) {
    return this.orderservice.AcceptBill(dto);
  }

  @Post('/cancel')
  cancelBill(@Body() dto: BillDto) {
    return this.orderservice.CancelBill(dto);
  }

  @Get('/finish')
  getUserFinishBill(@GetUser('id') userId: string) {
    return this.orderservice.getUserFinishBill(userId);
  }

  @Get('/cancel')
  getUserCancelBill(@GetUser('id') userId: string) {
    return this.orderservice.getUserCancelBill(userId);
  }
}
