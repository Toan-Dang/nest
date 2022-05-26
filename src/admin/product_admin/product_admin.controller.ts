import { Users } from '@prisma/client';
import { GetUser } from './../../auth/decorator/get-user.decorator';
import { ProductAdminService } from './product_admin.service';
import { Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guard/jwt.guard';
@UseGuards(JwtGuard)
@Controller('product-admin')
export class ProductAdminController {
    constructor (private productadmin : ProductAdminService){}
    @Get('')
    getListProduct(@GetUser('role') userRole: string){
        
    }
    @Get(':id')
    productDetail(@Param('id') productid: string){
        
    }
    @Post('')
    createProduct(@GetUser('') user:Users){

    }

    @Patch(':id')
    updateProduct(@Param('id') productid: string){

    }
    @Delete(':id')
    deleteProduct(@Param('id') productid: string){

    }
}
