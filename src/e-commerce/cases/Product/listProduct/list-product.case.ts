import { ListProductCaseInterface } from './list-product.case.interface';

export class ListProduct implements ListProductCaseInterface {
  constructor() {}
  exec(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
