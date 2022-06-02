import { identity } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
//wait -> verified -> shipping -> done
export class OrderAdminService {
  constructor(private prisma: PrismaService) {}
  async ListALLOrder() {
    const detail = await this.prisma.order.findMany({
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
        Status: true,
        CustomerId: true,
      },
    });
    let res = [];
    for await (let del of detail) {
      let username = await this.prisma.users.findUnique({
        where: {
          id: del.CustomerId,
        },
      });
      res.push({ ...del, username: username.UserName });
    }
    return res;
  }
  async ListWaitOrder() {
    const detail = await this.prisma.order.findMany({
      where: {
        Status: 'Wait',
      },
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
        CustomerId: true,
      },
    });
    let res = [];
    for await (let del of detail) {
      let username = await this.prisma.users.findUnique({
        where: {
          id: del.CustomerId,
        },
      });
      res.push({ ...del, username: username.UserName });
    }
    return res;
  }
  async ListAcceptOrder() {
    const detail = await this.prisma.order.findMany({
      where: {
        Status: 'Verified',
      },
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
        CustomerId: true,
      },
    });
    let res = [];
    for await (let del of detail) {
      let username = await this.prisma.users.findUnique({
        where: {
          id: del.CustomerId,
        },
      });
      res.push({ ...del, username: username.UserName });
    }
    return res;
  }

  async ListShippingOrder() {
    const detail = await this.prisma.order.findMany({
      where: {
        Status: 'Shipping',
      },
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
        CustomerId: true,
      },
    });
    let res = [];
    for await (let del of detail) {
      let username = await this.prisma.users.findUnique({
        where: {
          id: del.CustomerId,
        },
      });
      res.push({ ...del, username: username.UserName });
    }
    return res;
  }

  async ListDoneOrder() {
    const detail = await this.prisma.order.findMany({
      where: {
        Status: 'Done',
      },
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
        CustomerId: true,
      },
    });
    let res = [];
    for await (let del of detail) {
      let username = await this.prisma.users.findUnique({
        where: {
          id: del.CustomerId,
        },
      });
      res.push({ ...del, username: username.UserName });
    }
    return res;
  }

  async ListCancelOrder() {
    const detail = await this.prisma.order.findMany({
      where: {
        Status: 'Canceled',
      },
      select: {
        Detail: true,
        OrderDay: true,
        Paid: true,
        id: true,
        CustomerId: true
      },
    });
    let res = [];
    for await (let del of detail) {
      let username = await this.prisma.users.findUnique({
        where: {
          id: del.CustomerId,
        },
      });
      res.push({ ...del, username: username.UserName });
    }
    return res;
  }

  async toDone(orderid: string) {
    const status = await this.prisma.order.findUnique({
      where: {
        id: orderid,
      },
    });
    if (status.Status == 'Shipping') {
      await this.prisma.order.update({
        where: {
          id: orderid,
        },
        data: {
          Status: 'Done',
        },
      });
    } else if (status.Status == 'Shipping') {
      await this.prisma.order.update({
        where: {
          id: orderid,
        },
        data: {
          Status: 'Done',
        },
      });
    } else if (status.Status == 'Verified') {
      await this.prisma.order.update({
        where: {
          id: orderid,
        },
        data: {
          Status: 'Shipping',
        },
      });
    } else if (status.Status == 'Wait') {
      await this.prisma.order.update({
        where: {
          id: orderid,
        },
        data: {
          Status: 'Verified',
        },
      });
    }
    return {
      sussess: true,
      mess: 'đã cập nhật tình trạng đơn hàng',
    };
  }
}
