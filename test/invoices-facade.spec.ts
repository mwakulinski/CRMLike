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
  let mockInvoiceRepository: IInvoicesRepository;
  let mockUploaderService: IFilesUploaderService;
  let mockSenderService: ISenderService;
  let mockInvoiceFacade: IInvoiceFacade;

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
    mockSenderService = new SenderService();
    mockUploaderService = new FilesUploaderService();
  });

  beforeEach(() => {
    mockInvoiceRepository = new InvoiceRepository();
    mockInvoiceFacade = new InvoiceFacade(
      {
        senderService: mockSenderService,
        filesUploaderService: mockUploaderService,
      },
      mockInvoiceRepository
    );
  });

  describe("uploadNewInvoice", () => {
    it("should call method spyUploadFile once", async () => {
      const spyUploadFile = chai.spy.on(mockUploaderService, "uploadFile");
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
        mockSenderService,
        "informAboutNewInvoice"
      );
      await mockInvoiceFacade.uploadNewInvoice(mockInvoiceToUpload);
      expect(spyInformAboutNewInvoice).to.have.been.called.once;
    });
  });
});
