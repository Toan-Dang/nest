import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/Product.dto';

@Injectable()
export class ProductAdminService {
  constructor(private prisma: PrismaService) {}
  async getListProduct() {
    return await this.prisma.product.findMany({
      select: {
        ProductName: true,
        Version: true,
        Color: true,
        MSRP: true,
        UnitPrice: true,
        View: true,
        sold: true,
      },
    });
  }

  async getProductDetail(productid: string) {
    return await this.prisma.product.findUnique({
      where: {
        id: productid,
      },
    });
  }

  async createProduct(price: number, rawprice: number, dto: ProductDto) {
    return await this.prisma.product.create({
      data: {
        UnitPrice: price,
        MSRP: rawprice,
        ...dto,
        IsDelete: false,
        View: 0,
        sold: 0,
      },
    });
  }

  async updateProduct(
    proid: string,
    price: number,
    rawprice: number,
    dto: ProductDto,
  ) {
    return await this.prisma.product.update({
      where: {
        id: proid,
      },
      data: {
        UnitPrice: price,
        MSRP: rawprice,
        ...dto,
      },
    });
  }

  async deleteProduct(proid: string) {
    return await this.prisma.product.update({
      where: {
        id: proid,
      },
      data: {
        IsDelete: true,
      },
    });
  }
}
