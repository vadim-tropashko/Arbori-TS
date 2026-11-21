/** Minimal JSweet StringHelper functionality used by translated sources. */
export class StringHelper {
  static format(format: string, value: number): string {
    if (format !== "%04X") throw new Error(`Unsupported StringHelper format: ${format}`);
    return value.toString(16).toUpperCase().padStart(4, "0");
  }
}
