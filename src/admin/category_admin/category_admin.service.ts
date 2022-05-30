// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class CategoryAdminService {
//   constructor(private prisma: PrismaService) {}
//   async getListCategory() {
//     return await this.prisma.category.findMany();
//   }

//   async getCategoryDetail(productid: string) {
//     return await this.prisma.category.findUnique({
//       where: {
//         id: productid,
//       },
//     });
//   }

//   async createCategory(price: number, rawprice: number) {
//     return await this.prisma.category.create({
//       data: {
//         UnitPrice: price,
//         MSRP: rawprice,
//         ...dto,
//         IsDelete: false,
//         View: 0,
//         sold: 0,
//       },
//     });
//   }

//   async updateCategory(
//     proid: string,
//     price: number,
//     rawprice: number,
//     dto: ProductDto,
//   ) {
//     return await this.prisma.category.update({
//       where: {
//         id: proid,
//       },
//       data: {
//         UnitPrice: price,
//         MSRP: rawprice,
//         ...dto,
//       },
//     });
//   }

//   async deleteCategory(proid: string) {
//     return await this.prisma.category.update({
//       where: {
//         id: proid,
//       },
//       data: {
//         IsDelete: true,
//       },
//     });
//   }
// }
