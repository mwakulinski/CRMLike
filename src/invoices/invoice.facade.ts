import { IInvoiceToUpload } from "../interfaces/invoice.interface";
import { ISenderService } from "../sender/sender.service";
import { IFilesUploaderService } from "../uploader/uploader.service";
import { IInvoicesRepository } from "./invoices.repository";
import { IRepositories } from "../repositories";
import { IServices } from "../services";

export interface IInvoiceFacade {
  uploadNewInvoice: (invoiceToUpload: IInvoiceToUpload) => Promise<number>;
}

class InvoiceFacade implements IInvoiceFacade {
  private readonly invoicesRepository: IInvoicesRepository;
  private readonly filesUploaderService: IFilesUploaderService;
  private readonly senderService: ISenderService;

  constructor(
    { filesUploaderService, senderService }: IServices,
    { invoicesRepository }: IRepositories
  ) {
    this.invoicesRepository = invoicesRepository;
    this.filesUploaderService = filesUploaderService;
    this.senderService = senderService;
  }

  async uploadNewInvoice({ details, fileUrl, uploadTo }: IInvoiceToUpload) {
    const fileUploadResponse = await this.filesUploaderService.uploadFile({
      filePath: fileUrl,
      uploadTo: uploadTo,
    });

    console.log(fileUploadResponse);

    const { invoiceId } =
      await this.invoicesRepository.createNewInvoiceInformation({
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

export default InvoiceFacade;
