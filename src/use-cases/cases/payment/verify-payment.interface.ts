export interface VerifyPaymentInterface {
  exec(ata: {
    name: string;
    quantity: number;
    paymentMethod: string;
  }): Promise<boolean>;
}
