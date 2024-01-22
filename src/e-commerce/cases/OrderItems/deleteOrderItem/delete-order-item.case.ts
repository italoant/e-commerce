import { DeleteOrderItemCaseInterface } from './delete-order-item.case.interface';

export class DeleteOrderItem implements DeleteOrderItemCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
