import { CustomerDto } from './dto/customer.dto';
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getListCustomer() {
    //TODO: Chua co tk admin
    return await this.prisma.users.findMany({
      select: {
        UserName: true,
        FullName: true,
        Email: true,
        Address: true,
        PhoneNumber: true,
      },
    });
  }

  async getCustomer(cusid: string) {
    return await this.prisma.users.findUnique({ where: { id: cusid } });
  }

  async UpdateCustomer(cusid: string, dto: CustomerDto) {
    return await this.prisma.users.update({
      where: {
        id: cusid,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCustomer(cusid: string) {
    return await this.prisma.users.delete({ where: { id: cusid } });
  }
}
