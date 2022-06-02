import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}
  async getCustomer() {
    const cus = await this.prisma.users.findMany({});
    return cus.length;
  }

  async getProduct() {
    const cus = await this.prisma.product.findMany({});
    return cus.length;
  }

  async getOrder() {
    const cus = await this.prisma.order.findMany({});
    return cus.length;
  }

  async getProfit() {
    const cus = await this.prisma.order.findMany({});
    let res = 0;
    for await (let c of cus) {
      res += c.Paid;
    }
    return res;
  }

  async getChart() {
    const order = await this.prisma.order.findMany({
      where: {
        Status: 'Done',
      },
    });
    let res = [];
    for await (let date of order) {
      //if (date.OrderDay[5] == '0' && date.OrderDay[6] == '5') {
      res.push(date.OrderDay.getDay());
      // }
    }
    return res;
  }
}
