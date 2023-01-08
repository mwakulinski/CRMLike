import { Request, Response, Router } from "express";
import { IController } from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import validate from "./invoice.validation";
import { InvoiceToUploadType } from "../interfaces/invoice.interface";
import { IInvoiceFacade } from "./invoice.facade";
import { IFacades } from "../facades";

class InvoicesController implements IController {
  private readonly invoiceFacade: IInvoiceFacade;
  constructor(
    { invoiceFacade }: IFacades,
    public path = "/invoices",
    public router = Router()
  ) {
    this.invoiceFacade = invoiceFacade;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(validate.invoiceSave),
      this.uploadNewInvoice
    );
  }

  private uploadNewInvoice = async (
    req: Request,
    res: Response,
  ) => {
    const invoiceToUpload: InvoiceToUploadType = req.body;

    const invoiceId = await this.invoiceFacade.uploadNewInvoice(
      invoiceToUpload
    );

    return res.status(201).json({
      message: `Invoice with id: ${invoiceId} has been uploaded successfully`,
    });
  };
}

export default InvoicesController;
