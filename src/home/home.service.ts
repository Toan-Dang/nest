import { SearchDto } from './dto/search.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PrismaClient } from '@prisma/client';
import { Injectable, Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { json } from 'stream/consumers';
@Injectable()
export class HomeService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async getHotSale() {
    const hot = await this.prisma.product.findMany({
      orderBy: {
        sold: 'desc',
      },

      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
      where: {
        OR: [{ Type: 'Điện thoại' }, { Type: 'Laptop' }],
        NOT: [
          { ProductName: 'iPhone 11' },
          {
            ProductName: {
              contains: 'Samsung Galaxy Z',
            },
          },
        ],
      },
      distinct: ['ProductName'],
      take: 10,
    });
    return hot;
    // const url = 'http://127.0.0.1:5000/popu';
    // const data = await firstValueFrom(this.httpService.get(url));
    // console.log(data);
    // return data.data;
  }

  async getPhoneHot() {
    const hot = await this.prisma.product.findMany({
      orderBy: {
        View: 'desc',
      },
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
      where: {
        Type: 'Điện thoại',
      },
      distinct: ['ProductName'],
      take: 10,
    });

    return hot;
  }

  async getLapHot() {
    const hot = await this.prisma.product.findMany({
      orderBy: {
        View: 'desc',
      },
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
      where: {
        Type: 'Laptop',
      },
      distinct: ['ProductName'],
      take: 10,
    });
    return hot;
  }

  async getSearch(str: string) {
    return await this.prisma.product.findMany({
      where: {
        OR: [
          {
            ProductName: {
              contains: str,
              mode: 'insensitive',
            },
          },
          {
            CategoryName: {
              contains: str,
              mode: 'insensitive',
            },
          },
          {
            Type: {
              contains: str,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
      distinct: ['ProductName'],

      //take: 5,
    });
  }
}
