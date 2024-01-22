import { GetProductCaseInterface } from './get-product.case.interface';

export class GetProduct implements GetProductCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
