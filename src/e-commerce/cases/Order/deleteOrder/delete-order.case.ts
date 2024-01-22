import { DeleteOrderCaseInterface } from './delete-order.case.interface';

export class DeleteOrder implements DeleteOrderCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
