import { IDatabase } from "../database/database";
import {
  IInvoiceToUpload,
  InvoiceKey,
  InvoiceValue,
} from "../interfaces/invoice.interface";

type ISaveNewInvoiceInformationResponse = { invoiceId: number };

export interface IInvoicesRepository {
  createNewInvoiceInformation: (
    invoice: IInvoiceToUpload
  ) => Promise<ISaveNewInvoiceInformationResponse>;

  findInvoiceInformation: (
    invoiceId: number
  ) => Promise<IInvoiceToUpload | undefined>;

  filterInvoicesByProperty: (
    propertyKey: InvoiceKey,
    propertyValue: InvoiceValue
  ) => Promise<IInvoiceToUpload[]>;

  deleteInvoice: (invoiceId: number) => Promise<void>;
}

export class InvoiceRepository implements IInvoicesRepository {
  private invoices: IInvoiceToUpload[] = [];
  private counter = 0;

  async createNewInvoiceInformation(invoice: IInvoiceToUpload) {
    invoice.details.id = this.counter;
    this.invoices.push(invoice);
    this.counter++;
    return { invoiceId: invoice.details.id };
  }

  async findInvoiceInformation(invoiceId: number) {
    return this.invoices.find((invoice) => invoice.details.id === invoiceId);
  }

  async filterInvoicesByProperty(
    propertyKey: InvoiceKey,
    propertyValue: InvoiceValue
  ) {
    return this.invoices.filter(
      (invoice) => invoice.details[propertyKey] === propertyValue
    );
  }

  async deleteInvoice(invoiceId: number) {
    this.invoices = this.invoices.filter(
      (invoice) => invoice.details.id !== invoiceId
    );
  }
}

export default InvoiceRepository;
