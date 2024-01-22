import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../utils/ValueTransform';
import { Prisma } from '@prisma/client';

export class Product extends Entity {
  _productName: string;
  _description: string;
  _price: Prisma.Decimal;
  _stockQuantity: number;
  _creationDate: Date;
  _updatedDate: Date;

  constructor(
    id: string,
    productName: string,
    description: string,
    price: Prisma.Decimal,
    stockQuantity: number,
    creationDate: Date,
    updatedDate: Date,
  ) {
    super(id);

    this._productName = productName;
    this._description = description;
    this._price = price;
    this._stockQuantity = stockQuantity;
    this._creationDate = creationDate;
    this._updatedDate = updatedDate;
  }

  get productName(): string {
    return this._productName;
  }

  private set productName(productName: string) {
    this._productName = productName;
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

  get stockQuantity(): number {
    return this._stockQuantity;
  }

  private set stockQuantity(stockQuantity: number) {
    this._stockQuantity ? ValueTransform.roundToInt(stockQuantity) : null;
  }

  get creationDate(): Date {
    return this._creationDate;
  }

  private set creationDate(creationDate: Date) {
    this._creationDate = creationDate;
  }

  get updatedDate(): Date {
    return this._updatedDate;
  }

  private set updatedDate(updatedDate: Date) {
    this._updatedDate = updatedDate;
  }
}
