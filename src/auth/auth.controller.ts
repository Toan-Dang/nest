import { SigninDto } from './dto/signin.dto';
import { Users } from '@prisma/client';
import { GetUser } from './decorator/get-user.decorator';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
  Delete,
  Res,
  Get,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { response, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './guard';
import { PassThrough } from 'stream';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwt: JwtService) {}
  @Post('signup')
  SignUp(@Body() dto: SignupDto) {
    return this.authService.SignUp(dto);
  }
  @Post('signin')
  SignIn(@Body() dto: SigninDto) {
    return this.authService.Signin(dto);
  }

  @Post('forgotpassword')
  ForgotPass(@Body() email: string) {
    return this.authService.ForgotPass(email);
  }
}
