import { UpdateOrderCaseInterface } from './update-order.case.interface';

export class UpdateOrder implements UpdateOrderCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
