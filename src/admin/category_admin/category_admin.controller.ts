// import { CategoryAdminService } from './category_admin.service';
// import { Controller, Get, Param } from '@nestjs/common';

// @Controller('category-admin')
// export class CategoryAdminController {
//   constructor(private categoryadmin: CategoryAdminService) {}
//   @Get()
//   getListProduct() {
//     return this.categoryadmin.getListProduct();
//   }
//   @Get(':id')
//   productDetail(@Param('id') productid: string) {
//     return this.categoryadmin.getProductDetail(productid);
//   }
//   @Post()
//   createProduct(
//     @Body('UnitPrice', ParseIntPipe) price: number,
//     @Body('MSRP', ParseIntPipe) rawprice: number,
//     @Body() dto: ProductDto,
//   ) {
//     return this.categoryadmin.createProduct(price, rawprice, dto);
//   }

//   @Patch(':id')
//   updateProduct(
//     @Param('id') productid: string,
//     @Body('UnitPrice', ParseIntPipe) price: number,
//     @Body('MSRP', ParseIntPipe) rawprice: number,
//     @Body() dto: ProductDto,
//   ) {
//     return this.categoryadmin.updateProduct(productid, price, rawprice, dto);
//   }
//   @Patch('delete/:id')
//   deleteProduct(@Param('id') productid: string) {
//     return this.categoryadmin.deleteProduct(productid);
//   }
// }
