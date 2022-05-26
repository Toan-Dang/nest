import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}
  async getScoreBoard() {
    return await this.prisma.game.findMany({
      orderBy: { score: 'desc' },
    });
  }
  async updateScore(username: string, score: number) {
    const scb = await this.prisma.game.create({
      data: {
        username: username,
        score: score,
      },
    });
  }
}
