import mongoose, { Model } from "mongoose";
import { InvoiceUploadType } from "../../../interfaces/invoice.interface";
import { invoiceUploadSchema } from "../schemas/invoice-schema";

export type invoiceUploadModelType = Model<InvoiceUploadType>;

export const invoiceUploadModel: invoiceUploadModelType =
  mongoose.model<InvoiceUploadType>("InvoiceUpload", invoiceUploadSchema);
