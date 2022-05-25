import { RecommendDto } from './dto/recommend.dto';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeedbackDto } from 'src/feedback/dto/feedback.dto';
@Injectable()
export class RecommendService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async getContentBase(productid: string) {
    const productname = await this.prisma.product.findUnique({
      where: {
        id: productid,
      },
    });

    const url = 'http://127.0.0.1:5000/cb?name=' + productname.ProductName;

    const data = await firstValueFrom(this.httpService.get(url));
    const lst = data.data['item'];
    const res = [];
    for await (let hmu of lst) {
      let product = await this.prisma.product.findFirst({
        where: {
          ProductName: hmu,
        },
        select: {
          Picture: true,
          ProductName: true,
          MSRP: true,
          UnitPrice: true,
          id: true,
        },
      });
      res.push(product);
    }
    return res;
  }
  async getColapFilter(username: string, productid: string) {
    const url = 'http://127.0.0.1:5000';
    const data = await firstValueFrom(this.httpService.get(url));

    console.log(username);
    const lst = data.data[username];
    if (!lst) {
      return this.getContentBase(productid);
    }
    const res = [];
    for await (let hmu of lst) {
      let product = await this.prisma.productCrawl.findFirst({
        where: {
          ProductName: hmu,
        },
      });
      res.push(product);
    }
    return res;
  }

  async getallrecommendproduct() {
    return await this.prisma.productCrawl.findMany();
  }

  async getrecommendPhone() {
    return await this.prisma.productCrawl.findMany({
      where: {
        Type: 'Phone',
      },
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
      distinct: ['ProductName'],
    });
  }

  async getrecommendLaptop() {
    return await this.prisma.productCrawl.findMany({
      where: {
        Type: 'Laptop',
      },
      select: {
        Picture: true,
        ProductName: true,
        MSRP: true,
        UnitPrice: true,
        id: true,
      },
      distinct: ['ProductName'],
    });
  }

  async getrecommendProductbyID(proid: string) {
    const product = await this.prisma.productCrawl.findUnique({
      where: {
        id: proid,
      },
    });

    const detail = await this.prisma.productDetail.findMany({
      where: {
        ProductId: proid,
      },
    });
    detail.forEach((data) => {
      delete data.ProductId;
      delete data.id;
      data.detail = JSON.parse(JSON.stringify(data.detail));
    });

    return { product, detail };
  }
  ///////////////feedback

  async getrecommendProductFeedback(productid: string) {
    const cmt = await this.prisma.feedback.findMany({
      where: {
        ProductId: productid,
      },
    });

    let res = [];
    let average = 0;
    let score_1 = 0;
    let score_2 = 0;
    let score_3 = 0;
    let score_4 = 0;
    let score_5 = 0;

    for await (let user of cmt) {
      average += user.Rate;
      if (user.Rate < 2) ++score_1;
      else if (user.Rate < 3) ++score_2;
      else if (user.Rate < 4) ++score_3;
      else if (user.Rate < 5) ++score_4;
      else ++score_5;
      res.push({ ...user, username: user.username });
    }

    let ave = average / cmt.length;
    let ave1 = (score_1 * 100) / cmt.length;
    let ave2 = (score_2 * 100) / cmt.length;
    let ave3 = (score_3 * 100) / cmt.length;
    let ave4 = (score_4 * 100) / cmt.length;
    let ave5 = (score_5 * 100) / cmt.length;
    if (!ave) ave = 0;
    if (!ave1) ave1 = 0;
    if (!ave2) ave2 = 0;
    if (!ave3) ave3 = 0;
    if (!ave4) ave4 = 0;
    if (!ave5) ave5 = 0;
    return {
      feedback: res,
      total: {
        average_score: ave,
        score_1,
        score_2,
        score_3,
        score_4,
        score_5,
        ave1,
        ave2,
        ave3,
        ave4,
        ave5,
      },
    };
  }

  async addrecommendFeedback(
    productid: string,
    username: string,
    rate: number,
    dto: FeedbackDto,
  ) {
    const product = await this.prisma.productCrawl.findUnique({
      where: {
        id: productid,
      },
    });
    const usersz = await this.prisma.users.findFirst({
      where: {
        UserName: username,
      },
    });
    console.log(usersz);
    let userid = '';
    if (usersz) userid = usersz.id;

    console.log(userid);
    await this.prisma.feedback.create({
      data: {
        username: username,
        Rate: rate,
        userid: userid,
        Comment: dto.Comment,
        productname: product.ProductName,
        ProductId: productid,
        isShow: false,
      },
    });

    return {
      success: true,
      mess: 'Đánh giá thành công',
    };
  }
  async getrecommendAllFeedback() {
    return await this.prisma.feedbackCrawl.findMany();
  }

  async getrecommendFeedbackByUser(username: string) {
    return await this.prisma.feedback.findMany({
      where: {
        username: username,
      },
    });
  }
}
