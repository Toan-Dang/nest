import { DashboardModule } from './admin/dashboard/dashboard.module';
import { OrderAdminModule } from './admin/order_admin/order_admin.module';
import { ProductAdminModule } from './admin/product_admin/product_admin.module';
import { CustomerModule } from './admin/customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { CartModule } from './cart/cart.module';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { ContactModule } from './contact/contact.module';
import { FeedbackModule } from './feedback/feedback.module';
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
    HttpModule,
    RecommendModule,
    GameModule,
    CustomerModule,
    ProductAdminModule,
    OrderAdminModule,
    DashboardModule
  ],
})
export class AppModule {}
