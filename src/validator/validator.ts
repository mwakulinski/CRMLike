export class Validator {
  private static isTransformableToNumber(input: string | undefined) {
    return !Number.isNaN(Number(input));
  }

  static isTransformableToInteger(input: string | undefined) {
    return Number.isInteger(Number(input));
  }

  static isInGivenRange(
    input: string | undefined,
    range: { min: number; max: number }
  ) {
    if (!Validator.isTransformableToNumber(input)) {
      return false;
    }

    const inputAsNumber = Number(input);
    return inputAsNumber >= range.min && inputAsNumber <= range.max;
  }
}
