import { DashboardService } from './dashboard.service';
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboard: DashboardService) {}
  @Get('customer')
  getGetAllCustomer() {
    return this.dashboard.getCustomer();
  }

  @Get('product')
  getGetAllProduct() {
    return this.dashboard.getProduct();
  }

  @Get('order')
  getGetAllOrder() {
    return this.dashboard.getOrder();
  }
  @Get('profit')
  getGetAllProfit() {
    return this.dashboard.getProfit();
  }

  @Get('chart')
  getChart(){
      return this.dashboard.getChart();
  }
}
