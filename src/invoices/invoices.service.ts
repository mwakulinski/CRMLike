import { IUploadedInvoice } from "../interfaces/invoice.interface";

export interface IInvoicesService {
  saveNewInvoiceInformation: (invoice: IUploadedInvoice) => Promise<string>;
}

export class InvoiceService implements IInvoicesService {
  private invoices: IUploadedInvoice[] = [];
  private counter = 0;

  async saveNewInvoiceInformation(invoice: IUploadedInvoice) {
    invoice.details.id = this.counter;
    this.invoices.push(invoice);
    this.counter++;
    return `Invoice with id ${invoice.details.id} entry successfully added to database`;
  }
}

export default InvoiceService;
