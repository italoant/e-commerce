import Entity from 'src/common/entity/entity';
import { ValueTransform } from '../../utils/ValueTransform';

export class SaleReportEntity extends Entity {
  _period: Date;
  _totalSales: number;
  _sellerProducts: number;
  _filePath: string;

  constructor(
    id: string,
    period: Date,
    totalSales: number,
    sellerProducts: number,
    filePath: string,
  ) {
    super(id);

    this._period = period;
    this._totalSales = totalSales;
    this._sellerProducts = sellerProducts;
    this._filePath = filePath;
  }

  get period(): Date {
    return this._period;
  }

  private set period(period: Date) {
    this._period = period;
  }

  get totalSales(): number {
    return this._totalSales;
  }

  private set totalSales(totalSales: number) {
    this._totalSales ? ValueTransform.roundToDecimal(totalSales) : null;
  }

  get sellerProducts(): number {
    return this._sellerProducts;
  }

  private set sellerProducts(sellerProducts: number) {
    this._sellerProducts ? ValueTransform.roundToInt(sellerProducts) : null;
  }

  get filePath(): string {
    return this._filePath;
  }

  private set filePath(filePath: string) {
    this._filePath = filePath;
  }
}
