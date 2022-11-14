import {
  employeeModel,
  employeeModelType,
} from "./db/mongoose/models/employee-model";

export type modelsTypes = {
  employee: employeeModelType;
};

export const models = {
  employee: employeeModel,
};
