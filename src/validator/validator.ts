export class Validator {
  static isTransformableToNumber(input: any | undefined) {
    return !Number.isNaN(Number(input));
  }

  static isTransformableToInteger(input: any | undefined) {
    return Number.isInteger(Number(input));
  }

  static isInGivenRange(
    input: any | undefined,
    range: { min: number; max: number }
  ) {
    if (!Validator.isTransformableToNumber(input)) {
      return false;
    }

    const inputAsNumber = Number(input);
    return inputAsNumber >= range.min && inputAsNumber <= range.max;
  }
}
