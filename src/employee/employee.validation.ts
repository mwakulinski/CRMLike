import Joi from "joi";
import { EmployeeCreateType, Employment } from "./interfaces";

const employeeCreate: Joi.ObjectSchema<EmployeeCreateType> = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  githubAccount: Joi.string().required(),
  employmentType: Joi.string()
    .equal(...Object.values(Employment))
    .required(),
});

export default { employeeCreate };
