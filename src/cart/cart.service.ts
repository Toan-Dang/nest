import { CartDto } from './dto/cart.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async getCart(userid: string) {
    const cart = await this.prisma.cart.findMany({
      where: {
        UserId: userid,
      },
    });
    return cart;
  }
  async addCart(userid: string, dto: CartDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: dto.ProductId,
      },
    });
    const checkcart = await this.prisma.cart.findFirst({
      where: {
        UserId: userid,
        ProductId: dto.ProductId,
        Status: 'incart',
      },
    });
    if (checkcart) {
      return {
        success: false,
        mess: 'Đã có sản phẩm trong giỏ hàng',
      };
    } else {
      await this.prisma.cart.create({
        data: {
          UserId: userid,
          ...dto,
          Price: product.UnitPrice,
          Status: 'incart',
          Total: product.UnitPrice,
          Quantity: 1,
          ProductName: product.ProductName,
          Picture: product.Picture,
        },
      });
      return {
        success: true,
        mess: 'Thêm sản phẩm thành công',
      };
    }

    //  return this.getCart(userid);
  }

  async updateCart(userid: string, cartid: string, quantity: number) {
    try {
      const pro = await this.prisma.cart.findUnique({
        where: {
          id: cartid,
        },
        select: {
          ProductId: true,
        },
      });
      const pri = await this.prisma.product.findUnique({
        where: {
          id: pro.ProductId,
        },
        select: {
          UnitPrice: true,
        },
      });
      await this.prisma.cart.update({
        where: {
          id: cartid,
        },
        data: {
          Quantity: quantity,
          Total: quantity * pri.UnitPrice,
        },
      });
      return {
        success: true,
        mess: 'Cập nhật giỏ hàng thành công',
      };
    } catch (error) {
      return {
        success: false,
        mess: 'Cập nhật giỏ hàng thất bại',
        error,
      };
    }

    // return this.getCart(userid);
  }
  async deleteCart(userid: string, cartid: string) {
    try {
      await this.prisma.cart.delete({
        where: {
          id: cartid,
        },
      });
      return {
        success: true,
        mess: 'Xóa giỏ hàng thành công',
      };
    } catch (error) {
      return {
        success: false,
        mess: 'Xóa giỏ hàng thất bại',
        error,
      };
    }

    // return this.getCart(userid);
  }
  async deleteAllCart(userid: string) {
    try {
      await this.prisma.cart.deleteMany({
        where: {
          UserId: userid,
        },
      });
      return {
        success: true,
        mess: 'Xóa giỏ hàng thành công',
      };
    } catch (error) {
      return {
        success: false,
        mess: 'Xóa giỏ hàng thất bại',
        error,
      };
    }
  }
}
