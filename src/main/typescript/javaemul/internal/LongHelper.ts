/** Numeric equivalent of JSweet's decoded Java Long values. */
export class LongHelper {
  static decode(value: string): number {
    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed)) throw new RangeError(`Long value is outside JavaScript's safe integer range: ${value}`);
    return parsed;
  }
}
