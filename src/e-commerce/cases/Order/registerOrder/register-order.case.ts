import { RegisterOrderCaseInterface } from './register-order.case.interface';

export class RegisterOrder implements RegisterOrderCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
