import { ListOrderItemCaseInterface } from './list-order-item.case.interface';

export class ListOrderItem implements ListOrderItemCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
