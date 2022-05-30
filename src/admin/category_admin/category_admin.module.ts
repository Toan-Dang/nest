import { Module } from '@nestjs/common';
import { CategoryAdminController } from './category_admin.controller';
import { CategoryAdminService } from './category_admin.service';

@Module({
  controllers: [CategoryAdminController],
  providers: [CategoryAdminService]
})
export class CategoryAdminModule {}
