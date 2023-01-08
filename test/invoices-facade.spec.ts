import {
  IInvoicesRepository,
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
import {
  InvoiceToUploadType,
  InvoiceUploadedType,
  InvoiceType,
  InvoiceValues,
} from "../src/interfaces/invoice.interface";

chai.use(spies);

describe("invoice facade ", () => {
  let uploaderService: IFilesUploaderService;
  let senderService: ISenderService;

  let mockInvoiceFacade: IInvoiceFacade;
  let mockInvoiceRepository: IInvoicesRepository;

  class MockInvoiceRepository implements IInvoicesRepository {
    private invoices: InvoiceUploadedType[] = [];
    private counter = "";

    async createNewInvoiceInformation(
      invoice: InvoiceToUploadType
    ): Promise<InvoiceUploadedType> {
      this.counter += "a";
      const uploadedInvoice = { ...invoice, id: this.counter };
      this.invoices.push(uploadedInvoice);
      return uploadedInvoice;
    }
    async findInvoiceInformation(
      invoiceId: string
    ): Promise<InvoiceUploadedType | null> {
      const foundInvoice = this.invoices.find(
        (invoice) => invoice.id === invoiceId
      );
      if (!foundInvoice) return null;
      return foundInvoice;
    }

    async filterInvoicesByProperty(
      propertyKey: keyof InvoiceType,
      propertyValue: InvoiceValues
    ): Promise<InvoiceUploadedType[]> {
      return this.invoices.filter(
        (invoice) => invoice.details[propertyKey] === propertyValue
      );
    }

    async deleteInvoice(invoiceId: string): Promise<void> {
      this.invoices = this.invoices.filter(
        (invoice) => invoice.id !== invoiceId
      );
    }
  }

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
    mockInvoiceRepository = new MockInvoiceRepository();
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
      expect(
        await mockInvoiceFacade.uploadNewInvoice(mockInvoiceToUpload)
      ).to.equal("a");
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
