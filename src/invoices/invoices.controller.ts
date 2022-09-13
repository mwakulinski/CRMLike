import { NextFunction, Request, Response, Router } from "express";
import { IServices } from "..";
import { IController } from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import { IInvoicesService } from "./invoices.service";
import validate from "./invoice.validation";
import { IInvoiceToUpload } from "../interfaces/invoice.interface";
import { IFilesUploaderService } from "../uploader/uploader.service";
import { ISenderService } from "../sender/sender.service";

export class InvoicesController implements IController {
  private readonly invoicesService: IInvoicesService;
  private readonly filesUploaderService: IFilesUploaderService;
  private readonly senderService: ISenderService;
  constructor(
    { invoicesService, filesUploaderService, senderService }: IServices,
    public path = "/invoices",
    public router = Router()
  ) {
    this.invoicesService = invoicesService;
    this.filesUploaderService = filesUploaderService;
    this.senderService = senderService;
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
    next: NextFunction
  ) => {
    const invoiceToUpload: IInvoiceToUpload = req.body;
    await this.filesUploaderService.uploadFile({
      filePath: invoiceToUpload.fileUrl,
      uploadTo: invoiceToUpload.uploadTo,
    });
    const { invoiceId } = await this.invoicesService.saveNewInvoiceInformation(
      invoiceToUpload
    );
    await this.senderService.informAboutNewInvoice({
      ...invoiceToUpload.details,
      id: invoiceId,
    });
    res.status(201).json({
      message: `Invoice with id: ${invoiceId} has been uploaded successfully`,
    });
  };
}
