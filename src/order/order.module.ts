import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { StripeclientModule } from './stripeclient/stripeclient.module';

@Module({
  imports: [StripeclientModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
