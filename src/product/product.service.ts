import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { json2csv } from 'json-2-csv';
import { writeFileSync } from 'fs';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProduct() {
    return await this.prisma.product.findMany({
      distinct: ['ProductName'],
    });
  }
  async getProductbyID(proid: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: proid,
      },
    });
    //cap nhat luot view cho sp
    await this.prisma.product.update({
      where: {
        id: proid,
      },
      data: {
        View: product.View + 1,
      },
    });

    const pro_name = await this.prisma.product.groupBy({
      by: ['Version', 'Color', 'id', 'Picture', 'UnitPrice'],
      where: {
        ProductName: product.ProductName,
      },
    });

    const pro_version = await this.prisma.product.groupBy({
      by: ['Version'],
      where: {
        ProductName: product.ProductName,
      },
    });

    const res = [];
    const temp = [];
    res.push({ prod: product });
    pro_name.forEach((i) => {
      temp.push({
        version: i.Version,
        color: i.Color,
        id: i.id,
        picture: i.Picture,
        price: i.UnitPrice,
      });
    });

    let temp_ver = [];
    let temp_col = [];
    let temp_id = [];
    let temp_pic = [];
    let temp_pri = [];
    let verblock = [];
    pro_version.forEach((ver) => {
      temp_ver.push(ver.Version);

      temp.forEach((col) => {
        if (ver.Version == col['version']) {
          temp_col.push(col['color']);
          temp_id.push(col['id']);
          temp_pic.push(col['picture']);
          temp_pri.push(col['price']);
        }
      });

      verblock.push({
        version: temp_ver,
        color: [temp_col, temp_id, temp_pic, temp_pri],
      });
      temp_ver = [];
      temp_col = [];
      temp_id = [];
      temp_pic = [];
      temp_pri = [];
    });
    res.push({ version: verblock });

    return res;
  }

  async getPhone() {
    return await this.prisma.product.findMany({
      where: {
        Type: 'Điện thoại',
      },
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
      distinct: ['ProductName'],
    });
  }

  async getLaptop() {
    return await this.prisma.product.findMany({
      where: {
        Type: 'Laptop',
      },
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
      distinct: ['ProductName'],
    });
  }

  async getPhoneByCategory(cate: string) {
    return await this.prisma.product.findMany({
      where: {
        Type: 'Điện thoại',
        CategoryName: cate,
      },
      distinct: ['ProductName'],
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
    });
  }

  async getLapByCategory(cate: string) {
    return await this.prisma.product.findMany({
      where: {
        Type: 'Laptop',
        CategoryName: cate,
      },
      distinct: ['ProductName'],
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
    });
  }
}
