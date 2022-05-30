import { BillDto } from './dto/Bill.dto';
import { addOrderDto } from './dto/addorder.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async addOrder(userid: string, cartid: addOrderDto) {
    const detail = [];
    let total = 0;
    try {
      for await (let cart of cartid.cartId) {
        console.log(cart);
        let cartuser = await this.prisma.cart.findUnique({
          where: {
            id: cart,
          },
        });
        detail.push({
          ProductId: cartuser.ProductId,
          Quantity: cartuser.Quantity,
          Price: cartuser.Price,
          Total: cartuser.Total,
          ProductName: cartuser.ProductName,
          Image: cartuser.Picture,
          Rate: false,
        });
        total += cartuser.Total;

        await this.prisma.cart.delete({
          where: {
            id: cart,
          },
        });
        /////////cap nhat luot ban
        let product = await this.prisma.product.findUnique({
          where: {
            id: cartuser.ProductId,
          },
        });

        await this.prisma.product.update({
          where: {
            id: product.id,
          },
          data: {
            sold: product.sold + 1,
          },
        });
      }
      const add = await this.prisma.usersAddress.findFirst({
        where: {
          UserId: userid,
          Pick: true,
        },
      });

      await this.prisma.order.create({
        data: {
          CustomerId: userid,
          Deleted: false,
          Paid: total,
          Detail: detail,
          TransactStatus: cartid.payment,
          Status: 'Wait',
          Address: add.id,
        },
      });

      return { success: true, mess: 'Thanh toán thành công' };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
  async getBill(userid: string) {
    const order = await this.prisma.order.findMany({
      where: {
        CustomerId: userid,
        Status: {
          equals: 'Wait',
        },
      },
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
      },
    });
    if (order.length < 1) {
      return {
        success: false,
        mess: 'Chưa có đơn hàng nào cần xác nhận',
      };
    }

    return {
      success: true,
      order,
    };
  }
  async getDetail(userid: string, orderid: string) {
    const ord = await this.prisma.order.findUnique({
      where: {
        id: orderid,
      },
    });
    const addload = await this.prisma.usersAddress.findUnique({
      where: {
        id: ord.Address,
      },
      select: {
        Address: true,
        Name: true,
        PhoneNumber: true,
        Note: true,
      },
    });
    let hmu = {
      status: ord.Status,
      address: addload,
      detail: ord.Detail,
      payment: ord.TransactStatus,
      date: ord.OrderDay,
      totalbill: ord.Paid,
    };
    return hmu;
  }
  async AcceptBill(dto: BillDto) {
    const ord = await this.prisma.order.findUnique({
      where: {
        id: dto.orderid,
      },
    });

    //wait -> verified -> shipping -> done
    if (ord.Status == 'Wait') {
      await this.prisma.order.update({
        where: {
          id: dto.orderid,
        },
        data: {
          Status: 'Done',
        },
      });
    }
    return {
      success: true,
      mess: 'đã nhận hàng thành công',
    };
  }
  async CancelBill(orderid: BillDto) {
    await this.prisma.order.update({
      where: {
        id: orderid.orderid,
      },
      data: {
        Status: 'Canceled',
      },
    });
    return {
      success: true,
      mess: 'đã hủy thành công',
    };
  }

  async getUserFinishBill(userid: string) {
    const order = await this.prisma.order.findMany({
      where: {
        CustomerId: userid,
        Status: {
          equals: 'Done',
        },
      },
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
      },
    });
    if (order.length < 1) {
      return {
        success: false,
        mess: 'Chưa có đơn hàng nào đã thanh toán',
      };
    }
    return {
      success: true,
      order,
    };
  }

  async getUserCancelBill(userid: string) {
    const order = await this.prisma.order.findMany({
      where: {
        CustomerId: userid,
        Status: {
          equals: 'Canceled',
        },
      },
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
      },
    });
    if (order.length < 1) {
      return {
        success: false,
        mess: 'Chưa có đơn hàng nào đã hủy',
      };
    }
    return {
      success: true,
      order,
    };
  }
}
