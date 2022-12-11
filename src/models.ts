import {
  employeeModel,
  employeeModelType,
} from "./db/mongoose/models/employee-model";
import {
  invoiceToUploadModel,
  invoiceToUploadModelType,
} from "./db/mongoose/models/invoice-model";

export type modelsTypes = {
  employee: employeeModelType;
  invoice: invoiceToUploadModelType;
};

export const models = {
  employee: employeeModel,
  invoice: invoiceToUploadModel,
};
