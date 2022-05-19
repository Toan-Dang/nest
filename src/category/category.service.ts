import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategory() {
    // return await this.prisma.product.groupBy({
    //   by: ['Type', 'CategoryName', 'Picture'],
    //   where: {
    //     OR: [{ Type: 'Điện thoại' }, { Type: 'Laptop' }],
    //   },
    // });
    const laptop = await this.getLapCategory();
    const phone = await this.getPhoneCategory();
    return { laptop, phone };
  }

  // async getPhoneCategory() {
  //   const product = await this.prisma.product.groupBy({
  //     by: ['CategoryName'],
  //     where: {
  //       Type: 'Điện thoại',
  //     },
  //   });
  // }

  // async getLapCategory() {
  //   return await this.prisma.product.groupBy({
  //     by: ['CategoryName'],
  //     where: {
  //       Type: 'Laptop',
  //     },
  //   });
  // }

  async getPhoneCategory() {
    return await this.prisma.category.findMany({
      where: {
        Type: 'Điện thoại',
      },
      select: {
        CategoryName: true,
        Picture: true,
      },
    });
  }

  async getLapCategory() {
    return await this.prisma.category.findMany({
      where: {
        Type: 'Laptop',
      },
      select: {
        CategoryName: true,
        Picture: true,
      },
    });
  }
}
