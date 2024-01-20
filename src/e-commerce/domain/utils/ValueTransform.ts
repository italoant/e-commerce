export class ValueTransform {
  static roundToDecimal(value: number): number {
    return Math.round(value * 100) / 100;
  }

  static roundToInt(value: number): number {
    return Math.floor(value);
  }
}
