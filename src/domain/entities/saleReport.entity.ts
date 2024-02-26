import Entity from 'src/common/entity/entity';
import { OrderItem } from './orderItem.entity';

export class SalesReport extends Entity {
  _product_name: string;
  _orderItem: OrderItem;

  constructor(id: string, product_name: string, orderItem: OrderItem) {
    super(id);

    this._product_name = product_name;
    this._orderItem = orderItem;
  }

  get product_name(): string {
    return this._product_name;
  }

  private set product_name(product_name: number) {
    this._product_name;
  }

  get orderItem(): OrderItem {
    return this._orderItem;
  }

  private set orderItem(orderItem: OrderItem) {
    this._orderItem;
  }
}
