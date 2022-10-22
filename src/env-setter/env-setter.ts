import { Validator } from "../validator/validator";

// type validationFunctionType = (
//   localVariable: envType,
//   ...parameter: any[]
// ) => boolean;
type envType = string | undefined;

export class EnvSetter {
  // static setPort(localVariable: envType, validatorArray: validationFunctionType[]) {
  //     validatorArray.forEach(validateFunction => {
  //         if (!validateFunction(localVariable, )) {
  //             throw new Error(`${localVariable} doesn't meet required criteria`)
  //         }
  //     })
  //     return Number(localVariable)
  // }

  static setPort(localVariable: envType, range: { min: number; max: number }) {
    if (Validator.isTransformableToInteger(localVariable)) {
      throw new Error(`${localVariable} is not an Integer`);
    }

    if (Validator.isInGivenRange(localVariable, range)) {
      throw new Error(
        `${localVariable} must be in range ${range.min} - ${range.max}`
      );
    }

    return Number(localVariable);
  }
}
