import { InvoiceType } from "../interfaces/invoice.interface";

export interface ISenderService {
  informAboutNewInvoice: (invoice: InvoiceType) => Promise<void>;
}

class SenderService implements ISenderService {
  async informAboutNewInvoice(invoice: InvoiceType) {
    console.log(
      `New invoice from: ${invoice.owner} has been issued.\nAmount to pay: ${
        invoice.amountDue
      }, due date: ${new Date(invoice.dueDate).toLocaleDateString()}`
    );
  }
}

export default SenderService;
