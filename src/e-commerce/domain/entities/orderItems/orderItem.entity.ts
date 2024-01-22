import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../utils/ValueTransform';

export class OrderItem extends Entity {
  _purchaseId: string;
  _productId: string;
  _quantity: number;
  _unitPrice: number;
  _subTotal: number;

  constructor(
    id: string,
    purchaseId: string,
    productId: string,
    quantity: number,
    unitPrice: number,
    subTotal: number, //(calculado como Quantidade * Preço por Unidade
  ) {
    super(id);

    this._purchaseId = purchaseId;
    this._productId = productId;
    this._quantity = quantity;
    this._unitPrice = unitPrice;
    this._subTotal = subTotal;
  }

  get purchaseId(): string {
    return this._purchaseId;
  }

  private set purchaseId(purchaseId: string) {
    this._purchaseId = purchaseId;
  }

  get productId(): string {
    return this._productId;
  }

  private set productId(productId: string) {
    this._productId = productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  private set quantity(quantity: number) {
    this._quantity ? ValueTransform.roundToInt(quantity) : null;
  }

  get unitPrice(): number {
    return this._unitPrice;
  }

  private set unitPrice(unitPrice: number) {
    this._unitPrice ? ValueTransform.roundToDecimal(unitPrice) : null;
  }

  get subTotal(): number {
    return this._subTotal;
  }

  private set subTotal(value: number) {
    this._subTotal = value ? ValueTransform.roundToDecimal(value) : null;
  }

  sumSubtotalValue(quantity, unitPrice) {
    this.subTotal = ValueTransform.roundToDecimal(quantity * unitPrice);
  }
}
