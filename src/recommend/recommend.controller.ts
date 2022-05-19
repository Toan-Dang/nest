import { RecommendDto } from './dto/recommend.dto';
import { use } from 'passport';
import { RecommendService } from './recommend.service';
import { JwtGuard } from 'src/auth/guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FeedbackDto } from 'src/feedback/dto/feedback.dto';
import { get } from 'http';
import { GetUser } from 'src/auth/decorator';

@Controller('recommend')
export class RecommendController {
  constructor(private recommendservice: RecommendService) {}

  @Get('cb/:id')
  getcontentbase(@Param('id') productid: string) {
    
    return this.recommendservice.getContentBase(productid);
  }
  @UseGuards(JwtGuard)
  @Get('cf/:id')
  postUsername(
    @GetUser('UserName') username: string,
    @Param('id') productid: string,
  ) {
    return this.recommendservice.getColapFilter(username, productid);
  }

  @Get('product')
  getallrecommendProductcl() {
    return this.recommendservice.getallrecommendproduct();
  }

  @Get('product/phone')
  getrecommendPhone() {
    return this.recommendservice.getrecommendPhone();
  }

  @Get('product/laptop')
  getrecommendLaptop() {
    return this.recommendservice.getrecommendLaptop();
  }

  @Get('product/:id')
  getrecommendProductById(@Param('id') productid: string) {
    return this.recommendservice.getrecommendProductbyID(productid);
  }
  @Get('feedback')
  getrecommendAllFeedback() {
    return this.recommendservice.getrecommendAllFeedback();
  }
  @Get('feedback/:id')
  getrecommendProductFeedback(@Param('id') productid: string) {
    return this.recommendservice.getrecommendProductFeedback(productid);
  }
  @UseGuards(JwtGuard)
  @Post('feedback/:proid')
  addrecommendFeedback(
    @Param('proid') productid: string,
    @Body('Rate', ParseFloatPipe) rate: number,
    @Body() dto: FeedbackDto,
    @GetUser('UserName') username: string,
  ) {
    return this.recommendservice.addrecommendFeedback(
      productid,
      username,
      rate,
      dto,
    );
  }
  @Get('feedback/users/:id')
  getrecommendFeedbackByUser(@Param('id') username: string) {
    return this.recommendservice.getrecommendFeedbackByUser(username);
  }
}
