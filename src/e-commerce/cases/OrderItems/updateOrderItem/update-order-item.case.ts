import { UpdateOrderItemCaseInterface } from './update-order-item.case.interface';

export class UpdateOrderItem implements UpdateOrderItemCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
