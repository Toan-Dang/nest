import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';

@Controller('game')
export class GameController {
  private score: number;
  constructor() {
    this.score = 0;
  }
  @Get('')
  getRandomNumber() {
    return Math.floor(Math.random() * 3);
  }

  @Get('/score')
  getScore() {
    return this.score;
  }

  @Post('/score')
  setScore(@Body('score', ParseIntPipe) scorez: number) {
    this.score += scorez;
    return this.score;
  }
}
