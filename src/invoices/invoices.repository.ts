import {
  InvoiceUploadType,
  InvoiceKeys,
  InvoiceValues,
} from "../interfaces/invoice.interface";

export type ISaveNewInvoiceInformationResponse = { invoiceId: number };

export interface IInvoicesRepository {
  createNewInvoiceInformation: (
    invoice: InvoiceUploadType
  ) => Promise<ISaveNewInvoiceInformationResponse>;

  findInvoiceInformation: (
    invoiceId: number
  ) => Promise<InvoiceUploadType | undefined>;

  filterInvoicesByProperty: (
    propertyKey: InvoiceKeys,
    propertyValue: InvoiceValues
  ) => Promise<InvoiceUploadType[]>;

  deleteInvoice: (invoiceId: number) => Promise<void>;
}

export class InvoiceRepository implements IInvoicesRepository {
  private invoices: InvoiceUploadType[] = [];
  private counter = 0;

  async createNewInvoiceInformation(invoice: InvoiceUploadType) {
    invoice.details.id = this.counter;
    this.invoices.push(invoice);
    this.counter++;
    return { invoiceId: invoice.details.id };
  }

  async findInvoiceInformation(invoiceId: number) {
    return this.invoices.find((invoice) => invoice.details.id === invoiceId);
  }

  async filterInvoicesByProperty(
    propertyKey: InvoiceKeys,
    propertyValue: InvoiceValues
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
