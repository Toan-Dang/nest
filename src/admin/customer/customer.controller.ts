import { CustomerDto } from './dto/customer.dto';
import { CustomerService } from './customer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  constructor(private customerservice: CustomerService) {}
  @Get()
  getListCustomer() {
    return this.customerservice.getListCustomer();
  }

  @Get(':id')
  getCustomerById(@Param('id') customerid: string) {
    return this.customerservice.getCustomer(customerid);
  }

  @Post()
  createCustomer(@Body() dto: CustomerDto) {}

  @Patch(':id')
  updateCustomerById(
    @Param('id') customerid: string,
    @Body() dto: CustomerDto,
  ) {
    return this.customerservice.UpdateCustomer(customerid, dto);
  }

  @Delete(':id')
  deleteCustomerById(@Param('id') customerid: string) {
    return this.customerservice.deleteCustomer(customerid);
  }
}
