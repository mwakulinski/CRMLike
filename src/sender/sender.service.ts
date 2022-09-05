import { IInvoice } from "../interfaces/invoice.interface";

class SenderService {
  async informAboutNewInvoice(invoice: IInvoice) {
    console.log(
      `New invoice from: ${invoice.owner} has been issued.\nAmount to pay: ${invoice.amountDue}, due date: ${invoice.dueDate}`
    );
  }
}

export default SenderService;
