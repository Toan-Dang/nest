import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
//import { ProductModule } from './product/product.module';
import { MailModule } from './mail/mail.module';
import { CartModule } from './cart/cart.module';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { ContactModule } from './contact/contact.module';
import { FeedbackModule } from './feedback/feedback.module';
import { StripeModule } from './stripe/stripe.module';
import { CustomerModule } from './customer/customer.module';
import { HttpModule } from '@nestjs/axios';
import { RecommendModule } from './recommend/recommend.module';
import { GameModule } from './game/game.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    MailModule,
    CartModule,
    HomeModule,
    ProductModule,
    CategoryModule,
    InventoryModule,
    OrderModule,
    ContactModule,
    FeedbackModule,
    StripeModule.forRoot(process.env.STRIPE_KEY, { apiVersion: '2020-08-27' }),
    CustomerModule,
    HttpModule,
    RecommendModule,
    GameModule
  ],
})
export class AppModule {}
