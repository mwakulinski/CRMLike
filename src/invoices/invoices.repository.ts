import mongoose from "mongoose";
import { invoiceToUploadModelType } from "../db/mongoose/models/invoice-model";
import {
  InvoiceToUploadType,
  InvoiceKeys,
  InvoiceValues,
  InvoiceUploadedType,
} from "../interfaces/invoice.interface";

export type ISaveNewInvoiceInformationResponse = { invoiceId: string };

export interface IInvoicesRepository {
  createNewInvoiceInformation: (
    invoice: InvoiceToUploadType
  ) => Promise<InvoiceUploadedType>;

  findInvoiceInformation: (
    invoiceId: string
  ) => Promise<InvoiceUploadedType | null>;

  filterInvoicesByProperty: (
    propertyKey: InvoiceKeys,
    propertyValue: InvoiceValues
  ) => Promise<InvoiceUploadedType[]>;

  deleteInvoice: (invoiceId: string) => Promise<void>;
}

export class InvoiceRepository implements IInvoicesRepository {
  private readonly invoice: invoiceToUploadModelType;

  constructor({ invoice }: { invoice: invoiceToUploadModelType }) {
    this.invoice = invoice;
  }

  async createNewInvoiceInformation(uploadedInvoice: InvoiceToUploadType) {
    console.log(uploadedInvoice);
    const savedInvoice = await this.invoice.create(uploadedInvoice);
    return this.mapToDomain(savedInvoice);
  }

  async findInvoiceInformation(invoiceId: string) {
    const invoice = await this.invoice.findById(invoiceId);
    if (!invoice) return null;
    return this.mapToDomain(invoice);
  }

  async filterInvoicesByProperty(
    propertyKey: InvoiceKeys,
    propertyValue: InvoiceValues
  ) {
    const invoices = await this.invoice.find({
      [`details.${propertyKey}`]: propertyValue,
    });
    return invoices.map((invoice) => this.mapToDomain(invoice));
  }

  async deleteInvoice(invoiceId: string) {
    await this.invoice.deleteOne({ id: invoiceId });
  }

  private mapToDomain(
    DAO: mongoose.Document<unknown, any, InvoiceToUploadType> &
      InvoiceToUploadType & {
        _id: mongoose.Types.ObjectId;
      }
  ): InvoiceUploadedType {
    const plainObject = DAO.toObject({ versionKey: false });
    this.mapNestedId(plainObject);
    const { _id, ...domainObject } = plainObject;
    return { ...domainObject, id: _id.toString() };
  }

  private mapNestedId(objectToMap: Record<string, any>): any {
    Object.keys(objectToMap).forEach((key) => {
      if (typeof objectToMap[key] === "object") {
        if (objectToMap[key]["_id"] && key !== "id" && key !== "_id") {
          objectToMap[key]["id"] = objectToMap[key]["_id"].toString();
          delete objectToMap[key]["_id"];
        }
        return this.mapNestedId(objectToMap[key]);
      }
    });
  }
}

export default InvoiceRepository;
