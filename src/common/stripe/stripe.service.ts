import Stripe from 'stripe';

export class StripeService {
  stripeClient: Stripe;

  constructor() {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2023-10-16',
    });
  }

  async stripe(): Promise<Stripe> {
    return this.stripeClient;
  }
}