import { DeleteOrderCaseInterface } from '../deleteOrder/delete-order.case.interface';

export class DeleteOrder implements DeleteOrderCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
