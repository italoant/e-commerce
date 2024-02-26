import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../../common/utils/ValueTransform';
import { PurchaseStatus } from './order-enum';
import { Prisma } from '@prisma/client';

export class Order extends Entity {
  _external_client_id: string;
  _order_status: PurchaseStatus;
  _payment_status: string;
  _creation_date: Date;
  _total_order: Prisma.Decimal;

  constructor(
    id: string,
    external_client_id: string,
    payment_status: string,
    order_status: PurchaseStatus,
    creation_date: Date,
    total_order: Prisma.Decimal,
  ) {
    super(id);

    this._external_client_id = external_client_id;
    this._order_status = order_status;
    this._payment_status = payment_status;
    this._creation_date = creation_date;
    this._total_order = total_order;
  }

  get external_client_id(): string {
    return this._external_client_id;
  }

  private set external_client_id(external_client_id: string) {
    this._external_client_id = external_client_id;
  }

  get payment_status(): string {
    return this._payment_status;
  }

  private set payment_status(payment_status: string) {
    this._payment_status = payment_status;
  }

  get order_status(): PurchaseStatus {
    return this._order_status;
  }

  private set order_status(order_status: PurchaseStatus) {
    this._order_status = order_status;
  }

  get creation_date(): Date {
    return this._creation_date;
  }

  private set creation_date(creation_date: Date) {
    this._creation_date = creation_date;
  }

  get total_order(): Prisma.Decimal {
    return this._total_order;
  }

  private set total_order(total_order: number) {
    this._total_order ? ValueTransform.roundToDecimal(total_order) : null;
  }
}
