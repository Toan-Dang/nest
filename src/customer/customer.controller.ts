import { STRIPE_CLIENT } from './../stripe/constants';
import { Controller, Get, Inject } from '@nestjs/common';
import Stripe from 'stripe';

@Controller('customer')
export class CustomerController {
    constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe){}

    @Get()
    listCusomers(){
        return this.stripe.customers.list()
    }
}
