import { use } from 'passport';
import { FeedbackDto } from './dto/feedback.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}
  async getAllFeedback() {
    const cmt = await this.prisma.feedback.findMany();
    let res = [];
    for await (let user of cmt) {
      const username = await this.prisma.users.findUnique({
        where: {
          id: user.userid,
        },
      });
      res.push({ ...user, username: username.UserName });
    }
    return res;
  }

  async getProductFeedback(productid: string) {
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
    console.log(cmt);
    for await (let user of cmt) {
      let username = await this.prisma.users.findUnique({
        where: {
          id: user.userid,
        },
      });
      // username.UserName =
      //   username.UserName.charAt(0) +
      //   username.UserName.charAt(1) +
      //   '***' +
      //   username.UserName.charAt(username.UserName.length - 2) +
      //   username.UserName.charAt(username.UserName.length - 1);
      average += user.Rate;
      if (user.Rate < 2) ++score_1;
      else if (user.Rate < 3) ++score_2;
      else if (user.Rate < 4) ++score_3;
      else if (user.Rate < 5) ++score_4;
      else ++score_5;
      res.push({ ...user, username: username.UserName });
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

  async addFeedback(
    orderid: string,
    productid: string,
    userid: string,
    rate: number,
    dto: FeedbackDto,
  ) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderid,
      },
    });
    let dt = [];
    for await (let detail of order.Detail) {
      dt.push(detail);
    }

    for await (let det of dt) {
      if (det.ProductId == productid) {
        //false -> not rating
        //true -> is rated
        if (det.Rate) {
          return {
            success: false,
            mess: 'bạn đã đánh giá sản phẩm rồi',
          };
        } else {
          await this.prisma.feedback.create({
            data: {
              Comment: dto.Comment,
              ProductId: productid,
              Rate: rate,
              isShow: false,
              userid: userid,
            },
          });
          det.Rate = true;
        }
      }
    }

    await this.prisma.order.update({
      where: {
        id: orderid,
      },
      data: {
        Detail: dt,
      },
    });
    return {
      success: true,
      mess: 'Đánh giá thành công',
    };
  }

  async updateFeedback(feedbackid, rate, dto) {
    return await this.prisma.feedback.update({
      where: {
        id: feedbackid,
      },
      data: {
        Comment: dto.Comment,
        Rate: rate,
        isShow: false,
      },
    });
  }
  async deleteFeedback(feedbackid: string) {
    return await this.prisma.feedback.delete({
      where: {
        id: feedbackid,
      },
    });
  }
  async repFeedback(userid: string, feedbackid: string, dto: FeedbackDto) {
    return await this.prisma.feedback.create({
      data: {
        Comment: dto.Comment,
        isShow: false,
        repid: feedbackid,
        userid: userid,
      },
    });
  }



}
