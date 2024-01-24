import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../utils/ValueTransform';
import { Prisma } from '@prisma/client';

export class OrderItem extends Entity {
  _external_order: string;
  _external_product: string;
  _quantity: number;
  _unitary_price: Prisma.Decimal;
  _subtotal: Prisma.Decimal;

  constructor(
    id: string,
    external_order: string,
    external_product: string,
    quantity: number,
    unitary_price: Prisma.Decimal,
    subtotal: Prisma.Decimal, //(calculado como Quantidade * Preço por Unidade
  ) {
    super(id);

    this._external_order = external_order;
    this._external_product = external_product;
    this._quantity = quantity;
    this._unitary_price = unitary_price;
    this._subtotal = subtotal;
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

  get unitary_price(): Prisma.Decimal {
    return this._unitary_price;
  }

  private set unitary_price(unitary_price: number) {
    this._unitary_price = new Prisma.Decimal(
      ValueTransform.roundToDecimal(unitary_price),
    );
  }

  get subtotal(): Prisma.Decimal {
    return this._subtotal;
  }

  private set subtotal(value: Prisma.Decimal) {
    this._subtotal = value;
  }
}
