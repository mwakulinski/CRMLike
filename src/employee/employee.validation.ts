import Joi from "joi";
import { IEmployeeCreate } from "./interfaces";

const employeeCreate: Joi.ObjectSchema<IEmployeeCreate> = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  githubAccount: Joi.string().required(),
  employmentType: Joi.string().equal("B2B", "UZ").required(),
});

export default { employeeCreate };
