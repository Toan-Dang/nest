import { Module } from '@nestjs/common';
import { OrderAdminController } from './order_admin.controller';
import { OrderAdminService } from './order_admin.service';

@Module({
  controllers: [OrderAdminController],
  providers: [OrderAdminService]
})
export class OrderAdminModule {}
