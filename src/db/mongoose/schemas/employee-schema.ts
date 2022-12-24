import { Schema } from "mongoose";
import {
  EmployeeCreateType,
  EmploymentTypeArr,
} from "../../../employee/interfaces";

export const employeeSchema = new Schema<EmployeeCreateType>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  githubAccount: { type: String, required: true, unique: true },
  employmentType: { type: String, enum: EmploymentTypeArr, required: true },
});
