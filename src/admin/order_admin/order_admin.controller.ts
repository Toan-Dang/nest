import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderAdminService } from './order_admin.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
@Controller('order-admin')
export class OrderAdminController {
  constructor(private orderservice: OrderAdminService) {}
  @Get()
  ListALLOrder() {
    return this.orderservice.ListALLOrder();
  }
  @Get('Bill')
  ListAcceptOrder() {
    return this.orderservice.ListAcceptOrder();
  }
  @Get('Ship')
  ListShippingOrder() {
    return this.orderservice.ListShippingOrder();
  }
  @Get('Done')
  ListDoneOrder() {
    return this.orderservice.ListDoneOrder();
  }
  @Get('Cancel')
  ListCancelOrder() {
    return this.orderservice.ListCancelOrder();
  }

  @Post('toDone')
  OrderDone(@Body('orderid') orderid: string) {
    return this.orderservice.toDone(orderid);
  }
}
