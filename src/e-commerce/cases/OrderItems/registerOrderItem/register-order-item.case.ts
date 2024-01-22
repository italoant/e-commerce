import { RegisterOrderItemCaseInterface } from './register-order-item.case.interface';

export class RegisterOrderItem implements RegisterOrderItemCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
