import { CartService } from './cart.service';

import { CartDto } from './dto/cart.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get()
  getCart(@GetUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post()
  addCart(
    @GetUser('id') userId: string,
    @Body() dto: CartDto,
    //  @Body('Quantity', ParseIntPipe) quantity: number,
  ) {
    console.log(dto);
    return this.cartService.addCart(userId, dto);
  }

  @Patch(':id')
  updateCart(
    @GetUser('id') userId: string,
    @Param('id') cartid: string,
    @Body('Quantity', ParseIntPipe) quantity: number,
  ) {
    return this.cartService.updateCart(userId, cartid, quantity);
  }

  @Delete(':id')
  deleteCart(@GetUser('id') userId: string, @Param('id') cartid: string) {
    return this.cartService.deleteCart(userId, cartid);
  }

  @Delete()
  deleteAllCart(@GetUser('id') userId: string) {
    return this.cartService.deleteAllCart(userId);
  }
}
