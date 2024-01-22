import { GetOrderItemCaseInterface } from './get-order-item.case.interface';

export class GetOrderItem implements GetOrderItemCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
