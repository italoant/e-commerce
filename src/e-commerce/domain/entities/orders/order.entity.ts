import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../utils/ValueTransform';
import { PurchaseStatus } from './order-enum';
import { Prisma } from '@prisma/client';

export class Order extends Entity {
  _clientId: string;
  _purchaseStatus: PurchaseStatus;
  _purchaseDate: Date;
  _purhcaseTotal: Prisma.Decimal;

  constructor(
    id: string,
    clientId: string,
    purchaseStatus: PurchaseStatus,
    purchaseDate: Date,
    purhcaseTotal: Prisma.Decimal,
  ) {
    super(id);

    this._clientId = clientId;
    this._purchaseStatus = purchaseStatus;
    this._purchaseDate = purchaseDate;
    this._purhcaseTotal = purhcaseTotal;
  }

  get clientId(): string {
    return this._clientId;
  }

  private set clientId(clientId: string) {
    this._clientId = clientId;
  }

  get purchaseStatus(): PurchaseStatus {
    return this._purchaseStatus;
  }

  private set purchaseStatus(purchaseStatus: PurchaseStatus) {
    this._purchaseStatus = purchaseStatus;
  }

  get purchaseDate(): Date {
    return this._purchaseDate;
  }

  private set purchaseDate(purchaseDate: Date) {
    this._purchaseDate = purchaseDate;
  }

  get purhcaseTotal(): Prisma.Decimal {
    return this._purhcaseTotal;
  }

  private set purhcaseTotal(purhcaseTotal: number) {
    this._purhcaseTotal ? ValueTransform.roundToDecimal(purhcaseTotal) : null;
  }
}
