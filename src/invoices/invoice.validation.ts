import Joi from "joi";
import {
  InvoiceType,
  InvoiceUploadType,
} from "../interfaces/invoice.interface";

const invoiceSave: Joi.ObjectSchema<InvoiceUploadType> = Joi.object({
  fileUrl: Joi.string().required(),
  uploadTo: Joi.string().required(),
  details: Joi.object<InvoiceType>({
    amountDue: Joi.number().required(),
    owner: Joi.string().required(),
    subject: Joi.string().required(),
    dueDate: Joi.date().required(),
    issueDate: Joi.date().required(),
  }),
});

export default { invoiceSave };
