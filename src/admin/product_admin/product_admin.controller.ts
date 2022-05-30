import { Users } from '@prisma/client';
import { GetUser } from './../../auth/decorator/get-user.decorator';
import { ProductAdminService } from './product_admin.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { ProductDto } from './dto/Product.dto';
@UseGuards(JwtGuard)
@Controller('product-admin')
export class ProductAdminController {
  constructor(private productadmin: ProductAdminService) {}
  @Get()
  getListProduct() {
    return this.productadmin.getListProduct();
  }
  @Get(':id')
  productDetail(@Param('id') productid: string) {
    return this.productadmin.getProductDetail(productid);
  }
  @Post()
  createProduct(
    @Body('UnitPrice', ParseIntPipe) price: number,
    @Body('MSRP', ParseIntPipe) rawprice: number,
    @Body() dto: ProductDto,
  ) {
    return this.productadmin.createProduct(price, rawprice, dto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productid: string,
    @Body('UnitPrice', ParseIntPipe) price: number,
    @Body('MSRP', ParseIntPipe) rawprice: number,
    @Body() dto: ProductDto,
  ) {
    return this.productadmin.updateProduct(productid,price, rawprice, dto);
  }
  @Patch('delete/:id')
  deleteProduct(@Param('id') productid: string) {
    return this.productadmin.deleteProduct(productid)
  }
}
