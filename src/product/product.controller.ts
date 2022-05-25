import { ProductService } from './product.service';
import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { identity } from 'rxjs';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get('phone')
  getPhone() {
    return this.productService.getPhone();
  }

  @Get('laptop')
  getLaptop() {
    return this.productService.getLaptop();
  }

  @Get(':id')
  getProductById(@Param('id') productid: string) {
    return this.productService.getProductbyID(productid);
  }

  @Get('/phone/:phonecategory')
  getPhonebyCategory(@Param('phonecategory') cate: string) {
    console.log(cate);
    return this.productService.getPhoneByCategory(cate);
  }

  @Get('/laptop/:lapcategory')
  getLapbyCategory(@Param('lapcategory') cate: string) {
    console.log(cate);
    return this.productService.getLapByCategory(cate);
  }
}
