import { Module } from '@nestjs/common';
import { ProductAdminController } from './product_admin.controller';
import { ProductAdminService } from './product_admin.service';

@Module({
  controllers: [ProductAdminController],
  providers: [ProductAdminService]
})
export class ProductAdminModule {}
