/** Numeric equivalent of JSweet's decoded Java Integer values. */
export class IntegerHelper {
  static decode(value: string): number {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < -2147483648 || parsed > 2147483647) {
      throw new RangeError(`Invalid Java Integer value: ${value}`);
    }
    return parsed;
  }
}
