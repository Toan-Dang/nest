import { SearchDto } from './dto/search.dto';
import { HomeService } from './home.service';
import { Controller, Get, Param, Body } from '@nestjs/common';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get('hotsale')
  getHotSale() {
    return this.homeService.getHotSale();
  }

  @Get('phonehot')
  getPhoneHot() {
    return this.homeService.getPhoneHot();
  }

  @Get('laphot')
  getLapHot() {
    return this.homeService.getLapHot();
  }

  @Get('/search/:text')
  getSearchItem(@Param('text') str: string) {
    return this.homeService.getSearch(str);
  } 
}
