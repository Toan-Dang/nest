import { GameService } from './game.service';
import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';

@Controller('game')
export class GameController {
  constructor(private gameservice: GameService) {}
  @Get('')
  getRandomNumber() {
    return Math.floor(Math.random() * 3);
  }
  @Get('/score')
  getScoreboard() {
    return this.gameservice.getScoreBoard();
  }
  @Post('/score')
  setScore(
    @Body('score', ParseIntPipe) score: number,
    @Body('username') username: string,
  ) {
    return this.gameservice.updateScore(username, score);
  }
}
