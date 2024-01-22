import { RegisterProductCaseInterface } from './register-product.case.interface';

export class RegisterProduct implements RegisterProductCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
