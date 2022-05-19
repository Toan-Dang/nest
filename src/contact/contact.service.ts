import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}
  async getContact() {
    return await this.prisma.contact.findMany();
  }
  async addContact(dto: ContactDto) {
    return await this.prisma.contact.create({
      data: {
        name: dto.name,
        phone_number: dto.phone_number,
      },
    });
  }

  async updateContact(contactid: string, dto: ContactDto) {
    return await this.prisma.contact.update({
      where: {
        id: contactid,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteContact(contactid: string) {
    return await this.prisma.contact.delete({
      where: {
        id: contactid,
      },
    });
  }
}
