import { IServices } from "..";
import { IInvoiceToUpload } from "../interfaces/invoice.interface";
import { ISenderService } from "../sender/sender.service";
import { IFilesUploaderService } from "../uploader/uploader.service";
import { IInvoicesService } from "./invoices.service";

export interface IInvoiceFacade {
  uploadNewInvoice: (invoiceToUpload: IInvoiceToUpload) => Promise<number>;
}

class InvoicesFacade {
  private readonly invoicesService: IInvoicesService;
  private readonly filesUploaderService: IFilesUploaderService;
  private readonly senderService: ISenderService;
  constructor({
    invoicesService,
    filesUploaderService,
    senderService,
  }: IServices) {
    (this.invoicesService = invoicesService),
      (this.filesUploaderService = filesUploaderService),
      (this.senderService = senderService);
  }

  async uploadNewInvoice({ details, fileUrl, uploadTo }: IInvoiceToUpload) {
    const fileUploadResponse = await this.filesUploaderService.uploadFile({
      filePath: fileUrl,
      uploadTo: uploadTo,
    });

    console.log(fileUploadResponse);

    const { invoiceId } = await this.invoicesService.saveNewInvoiceInformation({
      details,
      fileUrl,
      uploadTo,
    });

    const senderResponse = await this.senderService.informAboutNewInvoice({
      ...details,
      id: invoiceId,
    });

    console.log(senderResponse);

    return invoiceId;
  }
}

export default InvoicesFacade;
