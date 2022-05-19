import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    AzureStorageModule.withConfig({
      sasKey: process.env['AZURE_STORAGE_SAS_KEY'],
      accountName: process.env['AZURE_STORAGE_ACCOUNT'],
      containerName: 'ava',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
