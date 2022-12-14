import InvoiceFacade, { IInvoiceFacade } from "./invoices/invoice.facade";
import { services } from "./services";
import { repositories } from "./repositories";

export interface IFacades {
  invoiceFacade: IInvoiceFacade;
}

export const facades: IFacades = {
  invoiceFacade: new InvoiceFacade(services, repositories),
};
