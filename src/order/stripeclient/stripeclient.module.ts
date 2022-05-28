import { Module } from '@nestjs/common';
import { StripeclientController } from './stripeclient.controller';
import { StripeclientService } from './stripeclient.service';
import { StripeModule } from 'nestjs-stripe';
@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: process.env['STRIPE_KEY'],
      apiVersion: '2020-08-27',
    }),
  ],
  controllers: [StripeclientController],
  providers: [StripeclientService]
})
export class StripeclientModule {}
