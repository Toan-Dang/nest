import { updateAddressUserDto } from './dto/updateAdress.dto';
import { AddressUserDto } from './dto/address.dto';
import { changeProfileDto } from './dto/updateProfile.dto';
import { UserService } from './user.service';
import { changePasswordDto } from './dto/passwordreset.dto';
import { JwtGuard } from './../auth/guard/jwt.guard';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/auth/decorator';
import { Users } from '@prisma/client';

import {
  AzureStorageFileInterceptor,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@GetUser('') user: Users) {
    return this.userService.getUser(user);
  }

  @Post('changepassword')
  changePassword(
    @GetUser('id') userId: string,
    @Body() pass: changePasswordDto,
  ) {
    return this.userService.changePass(userId, pass);
  }

  @Patch('changename')
  updateName(@GetUser('id') userId: string, @Body() info: changeProfileDto) {
    return this.userService.updateName(userId, info);
  }
  @Post('addphonenumber')
  addPhoneNumber(
    @GetUser('id') userId: string,
    @Body() info: changeProfileDto,
  ) {
    return this.userService.addPhoneNumber(userId, info);
  }

  @Patch('updatephonenumber')
  updatePhoneNumber(
    @GetUser('id') userId: string,
    @Body() info: changePasswordDto,
  ) {
    return this.userService.updatePhoneNumber(userId, info);
  }

  @Patch('changebirthday')
  updateBirthday(
    @GetUser('id') userId: string,
    @Body() info: changeProfileDto,
  ) {
    return this.userService.updateBirthDay(userId, info);
  }

  @Post('addAddress')
  addAddress(@GetUser('id') userId: string, @Body() dto: AddressUserDto) {
    return this.userService.addAddress(userId, dto);
  }

  @Patch('/updateAddress/:id')
  updateAddress(
    @GetUser('id') userId: string,
    @Body() info: AddressUserDto,
    @Param('id') id: string,
  ) {
    return this.userService.updateAddress(userId, info, id);
  }
  @Delete('/deleteAddress/:id')
  deleteAddress(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.userService.deleteAddress(userId, id);
  }
  @Get('listaddress')
  getUserListAddress(@GetUser('id') userId: string) {
    return this.userService.getListAddress(userId);
  }
  @Get('useraddress')
  getUserAddress(@GetUser('id') userId: string) {
    return this.userService.getUserAddress(userId);
  }
  @Patch('pickaddress/:id')
  getPickAddress(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.userService.pickAddress(userId, id);
  }
  @Get('address')
  getAddress(@GetUser('id') userId: string) {
    return this.userService.getAddress(userId);
  }
  @Post('ava')
  @UseInterceptors(AzureStorageFileInterceptor('file'))
  UploadedFilesUsingInterceptor(
    @UploadedFile()
    file: UploadedFileMetadata,
    @GetUser('id') userId: string,
  ) {
    return this.userService.uploadAva(userId, file.storageUrl);
  }
}
