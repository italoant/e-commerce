export interface VerifyPaymentInterface {
  exec(ata: { name: string; quantity: number }): Promise<boolean>;
}