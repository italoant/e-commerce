import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../../common/utils/ValueTransform';
import { Prisma } from '@prisma/client';

export class Product extends Entity {
  _product_name: string;
  _description: string;
  _price: Prisma.Decimal;
  _stock_quantity: number;
  _creation_date: Date;
  _update_date: Date;

  constructor(
    id: string,
    product_name: string,
    description: string,
    price: Prisma.Decimal,
    stock_quantity: number,
    creation_date: Date,
    update_date: Date,
  ) {
    super(id);

    this._product_name = product_name;
    this._description = description;
    this._price = price;
    this._stock_quantity = stock_quantity;
    this._creation_date = creation_date;
    this._update_date = update_date;
  }

  get product_name(): string {
    return this._product_name;
  }

  private set product_name(product_name: string) {
    this._product_name = product_name;
  }

  get description(): string {
    return this._description;
  }

  private set description(description: string) {
    this._description = description;
  }

  get price(): Prisma.Decimal {
    return this._price;
  }

  private set price(price: number) {
    this._price ? ValueTransform.roundToDecimal(price) : null;
  }

  get stock_quantity(): number {
    return this._stock_quantity;
  }

  private set stock_quantity(stock_quantity: number) {
    this._stock_quantity ? ValueTransform.roundToInt(stock_quantity) : null;
  }

  get creation_date(): Date {
    return this._creation_date;
  }

  private set creation_date(creation_date: Date) {
    this._creation_date = creation_date;
  }

  get update_date(): Date {
    return this._update_date;
  }

  private set update_date(update_date: Date) {
    this._update_date = update_date;
  }
}
