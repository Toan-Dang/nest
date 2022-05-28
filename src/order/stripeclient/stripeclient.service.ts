import { identity } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
@Injectable()
export class StripeclientService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    private prisma: PrismaService,
  ) {}
  async createPayment(orderid: string) {
    const customer = await this.stripe.customers.create();
    const ephemeralKey = await this.stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2020-08-27' },
    );
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderid,
      },
    });
    // const order = { Paid: 123 };
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: order.Paid * 10000,
      currency: 'VND',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        'pk_test_51KuZ5BGKWrsirHApDqoNhYGnpgKfQHWTc3w8ggPrNXVIu2wcZzW4tUPkDcpOzUt5KZsPrD59qbvf3EN0wkgsuvkk00kACvwP3t',
    };
  }
}
