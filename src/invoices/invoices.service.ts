import { IDatabase } from "../database/database";
import { IInvoiceToUpload } from "../interfaces/invoice.interface";

type ISaveNewInvoiceInformationResponse = { invoiceId: number };

export interface IInvoicesService {
  saveNewInvoiceInformation: (
    invoice: IInvoiceToUpload
  ) => Promise<ISaveNewInvoiceInformationResponse>;
}

export class InvoiceService implements IInvoicesService {
  private readonly invoices: IInvoiceToUpload[];
  private counter = 0;

  constructor({ invoices }: IDatabase) {
    this.invoices = invoices;
  }

  async saveNewInvoiceInformation(invoice: IInvoiceToUpload) {
    invoice.details.id = this.counter;
    this.invoices.push(invoice);
    this.counter++;
    return { invoiceId: invoice.details.id };
  }
}

export default InvoiceService;
