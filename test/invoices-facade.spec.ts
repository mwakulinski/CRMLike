import {
  IInvoicesRepository,
  InvoiceRepository,
} from "../src/invoices/invoices.repository";
import FilesUploaderService, {
  IFilesUploaderService,
} from "../src/uploader/uploader.service";
import SenderService, { ISenderService } from "../src/sender/sender.service";
import InvoiceFacade, { IInvoiceFacade } from "../src/invoices/invoice.facade";
import { beforeEach } from "mocha";
import { expect } from "chai";
import chai from "chai";
import spies from "chai-spies";

chai.use(spies);

describe("invoice facade ", () => {
  let uploaderService: IFilesUploaderService;
  let senderService: ISenderService;

  let mockInvoiceFacade: IInvoiceFacade;
  let mockInvoiceRepository: IInvoicesRepository;

  const mockInvoice = {
    amountDue: 200,
    dueDate: new Date(2022, 10, 7),
    issueDate: new Date(2022, 9, 24),
    owner: "Michal Wakulinski",
    subject: "Prace wykonane w pazdzierniku",
  };

  const mockInvoiceToUpload = {
    details: mockInvoice,
    uploadTo: "randomPlace",
    fileUrl: "invoice-01.pdf",
  };

  before(() => {
    senderService = new SenderService();
    uploaderService = new FilesUploaderService();
  });

  beforeEach(() => {
    mockInvoiceRepository = new InvoiceRepository();
    mockInvoiceFacade = new InvoiceFacade(
      {
        senderService: senderService,
        filesUploaderService: uploaderService,
      },
      { invoicesRepository: mockInvoiceRepository }
    );
  });

  describe("uploadNewInvoice", () => {
    it("should call method uploadFile once", async () => {
      const spyUploadFile = chai.spy.on(uploaderService, "upload");
      await mockInvoiceFacade.uploadNewInvoice(mockInvoiceToUpload);
      expect(spyUploadFile).to.have.been.called.once;
    });

    it("should call method createNewInvoiceInformation once", async () => {
      const spyCreateNewInvoiceInformation = chai.spy.on(
        mockInvoiceRepository,
        "createNewInvoiceInformation"
      );
      await mockInvoiceFacade.uploadNewInvoice(mockInvoiceToUpload);
      expect(spyCreateNewInvoiceInformation).to.have.been.called.once;
    });

    it("should return id of created invoice", async () => {
      chai.spy.on(
        mockInvoiceRepository,
        "createNewInvoiceInformation",
        async () => {
          return { invoiceId: 1 };
        }
      );

      expect(
        await mockInvoiceFacade.uploadNewInvoice(mockInvoiceToUpload)
      ).to.equal(1);
    });

    it("should call method informAboutNewInvoice once", async () => {
      const spyInformAboutNewInvoice = chai.spy.on(
        senderService,
        "informAboutNewInvoice"
      );
      await mockInvoiceFacade.uploadNewInvoice(mockInvoiceToUpload);
      expect(spyInformAboutNewInvoice).to.have.been.called.once;
    });
  });
});
