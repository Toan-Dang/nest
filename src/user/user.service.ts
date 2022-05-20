import { updateAddressUserDto } from './dto/updateAdress.dto';
import { AddressUserDto } from './dto/address.dto';
import { Users } from '@prisma/client';
import { async } from 'rxjs';
import { changeProfileDto } from './dto/updateProfile.dto';
import { changePasswordDto } from './dto/passwordreset.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { use } from 'passport';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(user: Users) {
    const email = user.Email;
    const phone = user.PhoneNumber;

    let len = 0;
    for await (const key of email) {
      if (key == '@') break;
      ++len;
    }
    if (phone != null) {
      const phoneres =
        phone.charAt(0) +
        phone.charAt(1) +
        phone.charAt(2) +
        '***' +
        phone.charAt(phone.length - 3) +
        phone.charAt(phone.length - 2) +
        phone.charAt(phone.length - 1);
      user.PhoneNumber = phoneres;
    }
    const res = email.charAt(0) + '***' + email.charAt(len - 1) + '@gmail.com';
    user.Email = res;

    return user;
  }

  async changePass(userid: string, dto: changePasswordDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userid,
      },
    });
    const pwMatches = await argon.verify(user.PasswordHash, dto.Old_Value);
    if (!pwMatches) {
      return {
        success: false,
        mess: 'Mật khẩu cũ không đúng',
      };
    } else {
      const hash = await argon.hash(dto.New_Value);
      try {
        await this.prisma.users.update({
          where: {
            id: userid,
          },
          data: {
            PasswordHash: hash,
          },
        });
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    }
  }
  async updateName(userid: string, profile: changeProfileDto) {
    try {
      console.log(profile.Text);
      await this.prisma.users.update({
        where: {
          id: userid,
        },
        data: {
          FullName: profile.Text,
        },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async addPhoneNumber(userid: string, profile: changeProfileDto) {
    try {
      await this.prisma.users.update({
        where: {
          id: userid,
        },
        data: {
          PhoneNumber: profile.Text,
        },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  async updatePhoneNumber(userid: string, number: changePasswordDto) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          id: userid,
          PhoneNumber: number.Old_Value,
        },
      });
      if (user) {
        await this.prisma.users.update({
          where: {
            id: userid,
          },
          data: {
            PhoneNumber: number.New_Value,
          },
        });
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          mess: 'Số điện thoại cũ không đúng',
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async updateBirthDay(userid: string, profile: changeProfileDto) {
    try {
      console.log(profile.Text);
      await this.prisma.users.update({
        where: {
          id: userid,
        },
        data: {
          Birthday: profile.Text,
        },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  async addAddress(userid: string, profile: AddressUserDto) {
    try {
      const add = await this.prisma.usersAddress.findFirst({
        where: {
          UserId: userid,
        },
      });
      if (!add) {
        const address = await this.prisma.usersAddress.create({
          data: {
            UserId: userid,
            Address: profile.Address,
            Name: profile.Name,
            Note: profile.Note,
            PhoneNumber: profile.PhoneNumber,
            Pick: true,
          },
        });
        return {
          success: true,
          data: address.id,
        };
      } else {
        const address = await this.prisma.usersAddress.create({
          data: {
            UserId: userid,
            Address: profile.Address,
            Name: profile.Name,
            Note: profile.Note,
            PhoneNumber: profile.PhoneNumber,
            Pick: false,
          },
        });
        return {
          success: true,
          data: address.id,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async updateAddress(userid: string, dto: AddressUserDto, id: string) {
    try {
      await this.prisma.usersAddress.update({
        where: {
          id: id,
        },
        data: {
          Name: dto.Name,
          Address: dto.Address,
          Note: dto.Note,
          PhoneNumber: dto.PhoneNumber,
        },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
  async deleteAddress(userid: string, id: string) {
    await this.prisma.usersAddress.delete({
      where: {
        id: id,
      },
    });
  }

  async getListAddress(userid: string) {
    return await this.prisma.usersAddress.findMany({
      where: {
        UserId: userid,
      },
    });
  }
  async getUserAddress(userid: string) {
    const add = await this.prisma.usersAddress.findFirst({
      where: {
        Pick: true,
        UserId: userid,
      },
      select: {
        Name: true,
        PhoneNumber: true,
        Address: true,
        Note: true,
        id: true,
      },
    });
    if (!add) {
      const add2 = await this.prisma.usersAddress.findFirst({
        select: {
          Name: true,
          PhoneNumber: true,
          Address: true,
          Note: true,
          id: true,
        },
        where: {
          UserId: userid,
        },
      });
      if (!add2) {
        return {
          success: false,
          mess: 'Người dùng chưa có địa chỉ nào',
        };
      } else {
        return {
          success: true,
          data: add2,
        };
      }
    } else {
      return {
        success: true,
        data: add,
      };
    }
  }

  async pickAddress(userid: string, address: string) {
    await this.prisma.usersAddress.updateMany({
      where: {
        UserId: userid,
      },
      data: {
        Pick: false,
      },
    });

    await this.prisma.usersAddress.update({
      where: {
        id: address,
      },
      data: {
        Pick: true,
      },
    });

    return {
      success: true,
    };
  }
  async getAddress(userid: string) {
    const address = await this.getUserAddress(userid);
    const listAddress = await this.getListAddress(userid);
    return {
      address,
      listAddress,
    };
  }

  async uploadAva(userid: string, filename: string) {
    try {
      await this.prisma.users.update({
        where: {
          id: userid,
        },
        data: {
          avaname: filename,
        },
      });
      return {
        success: true,
        mess: 'cap nhat ava thanh cong',
      };
    } catch (e) {
      return {
        success: false,
        e,
      };
    }
  }
}
