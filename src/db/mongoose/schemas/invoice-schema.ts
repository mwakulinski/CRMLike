import { Schema } from "mongoose";
import {
  InvoiceToUploadType,
  InvoiceType,
} from "../../../interfaces/invoice.interface";

export const invoiceSchema = new Schema<InvoiceType>({
  owner: { type: String, required: true },
  subject: { type: String, required: true },
  amountDue: { type: Number, required: true },
  issueDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
});

export const invoiceUploadSchema = new Schema<InvoiceToUploadType>({
  fileUrl: { type: String, required: true },
  uploadTo: { type: String, required: true },
  details: invoiceSchema,
});
