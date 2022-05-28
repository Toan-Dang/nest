import { StripeclientService } from './stripeclient.service';
import { Controller, Param, Post } from '@nestjs/common';

@Controller('stripeclient')
export class StripeclientController {
  constructor(private stripe: StripeclientService) {}
  @Post('payment/:id')
  createPayment(@Param('id') orderid: string) {
    return this.stripe.createPayment(orderid);
  }
}
