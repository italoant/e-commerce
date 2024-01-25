import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../utils/ValueTransform';
import { Prisma } from '@prisma/client';

export class SalesReport extends Entity {
  _period: Date;
  _total_sales: Prisma.Decimal;
  _total_orders: number;
  _filePath: string;
  _product: string;

  constructor(
    id: string,
    period: Date,
    total_sales: Prisma.Decimal,
    total_orders: number,
    product: string,
    filePath: string,
  ) {
    super(id);

    this._period = period;
    this._total_sales = total_sales;
    this._total_orders = total_orders;
    this._product = product;
    this._filePath = filePath;
  }

  get period(): Date {
    return this._period;
  }

  private set period(period: Date) {
    this._period = period;
  }

  get total_sales(): Prisma.Decimal {
    return this._total_sales;
  }

  private set total_sales(total_sales: number) {
    this._total_sales ? ValueTransform.roundToDecimal(total_sales) : null;
  }

  get total_orders(): number {
    return this._total_orders;
  }

  private set total_orders(total_orders: number) {
    this._total_orders ? ValueTransform.roundToInt(total_orders) : null;
  }

  get filePath(): string {
    return this._filePath;
  }

  private set filePath(filePath: string) {
    this._filePath = filePath;
  }

  get product(): string {
    return this._product;
  }

  private set product(product: string) {
    this._product = product;
  }
}
