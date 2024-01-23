import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../utils/ValueTransform';
import { Prisma } from '@prisma/client';

export class OrderItem extends Entity {
  _external_order: string;
  _external_product: string;
  _quantity: number;
  _unitaryPrice: Prisma.Decimal;
  _subTotal: Prisma.Decimal;

  constructor(
    id: string,
    external_order: string,
    external_product: string,
    quantity: number,
    unitaryPrice: Prisma.Decimal,
    subTotal: Prisma.Decimal, //(calculado como Quantidade * Preço por Unidade
  ) {
    super(id);

    this._external_order = external_order;
    this._external_product = external_product;
    this._quantity = quantity;
    this._unitaryPrice = unitaryPrice;
    this._subTotal = subTotal;
  }

  get external_order(): string {
    return this._external_order;
  }

  private set external_order(external_order: string) {
    this._external_order = external_order;
  }

  get external_product(): string {
    return this._external_product;
  }

  private set external_product(external_product: string) {
    this._external_product = external_product;
  }

  get quantity(): number {
    return this._quantity;
  }

  private set quantity(quantity: number) {
    this._quantity = ValueTransform.roundToInt(quantity);
  }

  get unitaryPrice(): Prisma.Decimal {
    return this._unitaryPrice;
  }

  private set unitaryPrice(unitaryPrice: number) {
    this._unitaryPrice = new Prisma.Decimal(
      ValueTransform.roundToDecimal(unitaryPrice),
    );
  }

  get subTotal(): Prisma.Decimal {
    return this._subTotal;
  }

  private set subTotal(value: Prisma.Decimal) {
    this._subTotal = value;
  }
}
