import mongoose, { Model } from "mongoose";
import { EmployeeCreateType } from "../../../employee/interfaces";
import { employeeSchema } from "../schemas/employee-schema";

export type employeeModelType = Model<EmployeeCreateType>;

export const employeeModel = mongoose.model<EmployeeCreateType>(
  "Employee",
  employeeSchema
);
