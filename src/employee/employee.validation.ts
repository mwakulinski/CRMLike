import Joi from "joi";
import { IEmployeeCreate, Employment } from "./interfaces";

const employeeCreate: Joi.ObjectSchema<IEmployeeCreate> = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  githubAccount: Joi.string().required(),
  employmentType: Joi.string()
    .equal(...Object.values(Employment))
    .required(),
});

export default { employeeCreate };
