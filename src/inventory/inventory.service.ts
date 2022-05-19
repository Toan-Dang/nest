import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}
  async getAllInvent() {
    return await this.prisma.inventory.findMany({
      select: {
        Name: true,
        Adress: true,
        Hotline: true,
        Latitude: true,
        Longitude: true,
      },
    });
  }
}
