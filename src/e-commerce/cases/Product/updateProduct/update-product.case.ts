import { UpdateProductCaseInterface } from './update-product.case.interface';

export class UpdateProduct implements UpdateProductCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
