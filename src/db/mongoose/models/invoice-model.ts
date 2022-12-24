import mongoose, { Model } from "mongoose";
import { InvoiceToUploadType } from "../../../interfaces/invoice.interface";
import { invoiceUploadSchema } from "../schemas/invoice-schema";

export type invoiceToUploadModelType = Model<InvoiceToUploadType>;

export const invoiceToUploadModel: invoiceToUploadModelType =
  mongoose.model<InvoiceToUploadType>("InvoiceUpload", invoiceUploadSchema);
