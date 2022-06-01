import { SigninDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from './../prisma/prisma.service';
import * as argon from 'argon2';
import { ForbiddenException, Injectable, Module } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import JWTRedis from 'jwt-redis';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailService: MailService,
  ) {}
  async SignUp(dto: SignupDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    //save new user in the db
    try {
      const user = await this.prisma.users.create({
        data: { Email: dto.email, PasswordHash: hash, UserName: dto.username },
      });
      // const token = Math.floor(1000 + Math.random() * 9000).toString();
      // await this.mailService.sendUserConfirmation(user, token);
      return this.SignToken(user.id, user.Email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // throw new ForbiddenException('Credential taken');
          return {
            success: false,
            mess: 'Tài khoản đã tồn tại',
          };
        }
      }
      throw error;
    }
  }
  async Signin(dto: SigninDto) {
    //find user by email
    const user = await this.prisma.users.findUnique({
      where: {
        UserName: dto.username,
      },
    });

    // if (!user) throw new ForbiddenException('null');
    if (!user) {
      return {
        success: false,
        mess: 'Tài khoản không có',
      };
    }
    //compare email input with db
    const pwMatches = await argon.verify(user.PasswordHash, dto.password);
    // if (!pwMatches) throw new ForbiddenException('dung cos dang nhap nua hmu hmu');
    if (!pwMatches) {
      return {
        success: false,
        mess: 'Sai mật khẩu',
      };
    }
    return this.SignToken(user.id, user.Email);
  }

  async SignToken(userId: string, email: string) {
    const payload = {
      userId,
      email,
    };
    const secretString = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '3d',
      secret: secretString,
    });
    console.log(token);
    return {
      success: true,
      // data: {
      //   userId,
      // },

      token: token,
    };
  }
  async ForgotPass(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        Email: email,
      },
    });
    if (user != null) {
      return { success: false, mess: 'not that email' };
    }
    // const token = Math.floor(1000 + Math.random() * 9000).toString();
    // await this.mailService.sendUserConfirmation(user, token);
    return {
      success: true,
    };
  }
}
