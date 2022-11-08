type validationFunctionType = (
  localVariable: envType,
  ...parameters: any[]
) => boolean;
type envType = string | undefined;

export class EnvSetter {
  static setPort(
    localVariable: envType,
    functionsToValidate: {
      functionToValidate: validationFunctionType;
      args?: any[];
    }[]
  ) {
    let defaultPortValue;
    functionsToValidate.some(({ functionToValidate, args }) => {
      if (!functionToValidate(localVariable, args)) {
        defaultPortValue = 3000;
        console.log(
          `${localVariable} doesn't meet required criteria for port\n setting default porty value: ${defaultPortValue}`
        );
        return true;
      }
    });
    return defaultPortValue || Number(localVariable);
  }
}
