import { CategoryService } from './category.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private categoryservice: CategoryService) {}

  @Get()
  getAllCategory() {
    return this.categoryservice.getAllCategory();
  }

  @Get('phone')
  getPhoneCategory() {
    return this.categoryservice.getPhoneCategory();
  }

  @Get('laptop')
  getLapCategory() {
    return this.categoryservice.getLapCategory();
  }

  
}
