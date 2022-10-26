import InvoiceFacade, { IInvoiceFacade } from "./invoices/invoiceFacade";
import { services } from "./services";
import { repositories } from "./repositories";

export interface IFacades {
  invoiceFacade: IInvoiceFacade;
}

export const facades: IFacades = {
  invoiceFacade: new InvoiceFacade(services, repositories),
};
