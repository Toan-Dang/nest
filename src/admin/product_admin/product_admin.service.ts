import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductAdminService {
  constructor(private prisma: PrismaService) {}
  async getListProduct() {
    return await this.prisma.product.findMany();
  }

  async getProductDetail(productid: string) {
    return await this.prisma.product.findUnique({
      where: {
        id: productid,
      },
    });
  }

  
}
