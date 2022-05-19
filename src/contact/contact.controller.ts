import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('contact')
export class ContactController {
  constructor(private contactservice: ContactService) {}
  @Get()
  getAllContact() {
    return this.contactservice.getContact();
  }
  @Post()
  addContact(@Body() dto: ContactDto) {
    console.log(dto);
    return this.contactservice.addContact(dto);
  }
  @Put(':id')
  updateContact(@Param('id') id: string, @Body() dto: ContactDto) {
    console.log(dto);
    return this.contactservice.updateContact(id, dto);
  }
  @Delete(':id')
  deleteContact(@Param('id') id: string) {
    return this.contactservice.deleteContact(id);
  }
}
