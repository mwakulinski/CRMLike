import Joi from "joi";
import { IEmployeeCreate, EmploymentType } from "./interfaces";

const employeeCreate: Joi.ObjectSchema<IEmployeeCreate> = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  githubAccount: Joi.string().required(),
  employmentType: Joi.string()
    .equal(...Object.values(EmploymentType))
    .required(),
});

export default { employeeCreate };
