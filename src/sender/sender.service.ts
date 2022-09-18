import { IUtilsServices } from "..";
import { IDateHandlerService } from "../date-handler/date-handler.service";
import { IInvoice } from "../interfaces/invoice.interface";

export interface ISenderService {
  informAboutNewInvoice: (invoice: IInvoice) => Promise<string>;
}

class SenderService {
  private readonly dateHandlerService: IDateHandlerService;
  constructor({ dateHandlerService }: IUtilsServices) {
    this.dateHandlerService = dateHandlerService;
  }

  async informAboutNewInvoice(invoice: IInvoice) {
    return `New invoice from: ${
      invoice.owner
    } has been issued.\nAmount to pay: ${
      invoice.amountDue
    }, due date: ${this.dateHandlerService.getFullDate(invoice.dueDate)}`;
  }
}

export default SenderService;
