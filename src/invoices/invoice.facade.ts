import {
  InvoiceToUploadType,
  InvoiceUploadedType,
} from "../interfaces/invoice.interface";
import { ISenderService } from "../sender/sender.service";
import { IFilesUploaderService } from "../uploader/uploader.service";
import { IInvoicesRepository } from "./invoices.repository";
export interface IInvoiceFacade {
  uploadNewInvoice: (invoiceToUpload: InvoiceToUploadType) => Promise<string>;
}

class InvoiceFacade implements IInvoiceFacade {
  private readonly invoicesRepository: IInvoicesRepository;
  private readonly filesUploaderService: IFilesUploaderService;
  private readonly senderService: ISenderService;

  constructor(
    {
      filesUploaderService,
      senderService,
    }: {
      filesUploaderService: IFilesUploaderService;
      senderService: ISenderService;
    },
    { invoicesRepository }: { invoicesRepository: IInvoicesRepository }
  ) {
    this.invoicesRepository = invoicesRepository;
    this.filesUploaderService = filesUploaderService;
    this.senderService = senderService;
  }

  async uploadNewInvoice({ details, fileUrl, uploadTo }: InvoiceToUploadType) {
    const [filesUploaderResponse, { id }]: [string, InvoiceUploadedType] =
      await Promise.all([
        this.filesUploaderService.upload({
          filePath: fileUrl,
          uploadTo: uploadTo,
        }),
        this.invoicesRepository.createNewInvoiceInformation({
          details,
          fileUrl,
          uploadTo,
        }),
      ]);

    await this.senderService.informAboutNewInvoice({
      ...details,
    });

    return id;
  }
}

export default InvoiceFacade;
