import { DeleteProductCaseInterface } from './delete-product.case.interface';

export class DeleteProduct implements DeleteProductCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
