import { GetOrderCaseInterface } from './get-order.case.interface';

export class GetOrder implements GetOrderCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
