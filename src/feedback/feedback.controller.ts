import { FeedbackDto } from './dto/feedback.dto';
import { FeedbackService } from './feedback.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
@UseGuards(JwtGuard)
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackservice: FeedbackService) {}
  @Get()
  getFeedback() {
    return this.feedbackservice.getAllFeedback();
  }

  @Get(':id')
  getProductFeedback(@Param('id') productid: string) {
    return this.feedbackservice.getProductFeedback(productid);
  }

  @Post(':id/:proid')
  addFeedback(
    @Param('proid') productid: string,
    @Param('id') orderid: string,
    @GetUser('id') userId: string,
    @Body('Rate', ParseFloatPipe) rate: number,
    @Body() dto: FeedbackDto,
  ) {

    return this.feedbackservice.addFeedback(
      orderid,
      productid,
      userId,
      rate,
      dto,
    );
  }

  @Put(':id')
  updateFeedback(
    @Param('id') feedbackid: string,
    @Body('Rate', ParseFloatPipe) rate: number,
    @Body() dto: FeedbackDto,
  ) {
    return this.feedbackservice.updateFeedback(feedbackid, rate, dto);
  }

  @Delete(':id')
  deleteFeedback(@Param('id') feedbackid: string) {
    return this.feedbackservice.deleteFeedback(feedbackid);
  }

  @Post('reply/:id/:productid')
  repFeedback(
    @GetUser('id') userId: string,
    @Param('id') feedbackid: string,
    @Body() dto: FeedbackDto,
  ) {
    return this.feedbackservice.repFeedback(userId, feedbackid, dto);
  }


}
